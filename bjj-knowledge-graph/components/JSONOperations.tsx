import { useEffect, useState } from 'react';
import { EdgeData } from './EdgeForm';
import { NodeData } from './NodeForm';

interface Data {
    nodes: NodeData[];
    edges: EdgeData[];
}

function JSONOperations() {
    const [data, setData] = useState<Data | null>(null);


    const handleBackup = async () => {
        // Fetch all nodes and edges, then save them to a JSON file
    };

    const handleLoad = async () => {
        const response = await fetch('/api/backup');
        const data = await response.json();
        console.log(data);
        setData(data);
      };

    useEffect(() => {
        if (data) {
            data.nodes.forEach(async (node) => {
                await fetch('/api/nodes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(node),
                });
            });

            data.edges.forEach(async (edge) => {
                await fetch('/api/edges', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(edge),
                });
            });
        }
    }, [data]);

    return (
        <div>
            <button onClick={handleBackup}>Backup to JSON</button>
            <button onClick={handleLoad}>Load from JSON</button>
        </div>
    );
}

export default JSONOperations;