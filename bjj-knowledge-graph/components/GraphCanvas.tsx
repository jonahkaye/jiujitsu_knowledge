import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NodeData } from './NodeForm';
import { EdgeData } from './EdgeForm';

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
            const processedEdges = edgesData.map((edge: EdgeData) => ({
                ...edge,
                source: nodesData.find((node: NodeData) => node.id === edge.source),
                target: nodesData.find((node: NodeData) => node.id === edge.target)
            }));
    
            setLinks(processedEdges);

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
            .attr("r", 5); // set a radius
        

         // Define the simulation
        let width = 0;
        let height = 0;

        if (canvasRef.current) {
            width = canvasRef.current.clientWidth;
            height = canvasRef.current.clientHeight;
        }

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));
            
    
        // Update the positions of the nodes and links on each "tick" of the simulation
        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);
    
            node.attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });
    
    }, [nodes, links]);

    return <svg ref={canvasRef} style={{ width: '100%', height: '600px', border: '1px solid black' }}></svg>;
}

export default GraphCanvas;