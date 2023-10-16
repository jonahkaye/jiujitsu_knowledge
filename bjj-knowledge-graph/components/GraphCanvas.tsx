import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NodeData } from './NodeForm';
import { EdgeData, EdgeRawData } from './EdgeForm';

function GraphCanvas() {
    const canvasRef = useRef<SVGSVGElement | null>(null);
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [links, setLinks] = useState<EdgeData[]>([]);

    useEffect(() => {
        Promise.all([
            fetch('/api/getAllNodes').then(response => response.json()),
            fetch('/api/getAllEdges').then(response => response.json())
        ]).then(([nodesData, edgesData]) => {
            setNodes(nodesData);
            // Convert edges' source and target from ID strings to actual node references
            const processedEdges = edgesData.map((edge: EdgeRawData) => {
                const sourceNode = nodesData.find((node: NodeData) => node.id === edge.source);
                const targetNode = nodesData.find((node: NodeData) => node.id === edge.target);
            
                if (!sourceNode || !targetNode) {
                    console.error("Node not found for edge:", edge);
                    return null;
                }
            
                return {
                    ...edge,
                    source: sourceNode,
                    target: targetNode
                };
            }).filter((edge: EdgeData) => edge !== null) as EdgeData[]; // filter out null values and assert as EdgeData[]
            
            setLinks(processedEdges);
            console.log(processedEdges)
        });
    }, []);

    useEffect(() => {
        const svg = d3.select(canvasRef.current);
    
        // Clear the SVG
        svg.selectAll('*').remove();
    
        // Create the link lines
        const link = svg.selectAll(".link")
            .data(links)
            .join("line")
            .attr("class", "link")
            .style("stroke", "#555")
            .style("stroke-width", "3px");

    
        // Create the node circles
        const node = svg.selectAll(".node")
            .data(nodes)
            .join("circle")
            .attr("class", "node")
            .style("fill", "#333")
            .attr("r", 5);


        link.style("stroke", "#555")
            .style("stroke-width", "3px");

        node.style("fill", "#333")
            .attr("r", 10); // set a radius
        

         // Define the simulation
        let width = 0;
        let height = 0;

        if (canvasRef.current) {
            width = canvasRef.current.clientWidth;
            height = canvasRef.current.clientHeight;
        }

        console.log("Setting up simulation with nodes:", nodes);
        console.log("Setting up simulation with links:", links);
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink<NodeData, EdgeData>(links).id((d: NodeData) => (d.id ? d.id.toString() : 'fallback_value')))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));


            simulation.on("tick", () => {
                link
                    .attr("x1", (d: EdgeData) => (d.source as NodeData).x || 0)
                    .attr("y1", (d: EdgeData) => (d.source as NodeData).y || 0)
                    .attr("x2", (d: EdgeData) => (d.target as NodeData).x || 0)
                    .attr("y2", (d: EdgeData) => (d.target as NodeData).y || 0);
                    
                node
                    .attr("cx", (d: NodeData) => d.x || 0)
                    .attr("cy", (d: NodeData) => d.y || 0);
                });
    
    }, [nodes, links]);

    return <svg ref={canvasRef} style={{ width: '100%', height: '600px', border: '1px solid black' }}></svg>;
}

export default GraphCanvas;