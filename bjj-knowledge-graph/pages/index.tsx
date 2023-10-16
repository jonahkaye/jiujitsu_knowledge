import GraphCanvas from '../components/GraphCanvas';
import NodeForm, { NodeData } from '../components/NodeForm';
import { EdgeForm, EdgeData } from '../components/EdgeForm';
import JSONOperations from '../components/JSONOperations';

import { useState } from 'react';

export default function HomePage() {
    const [showNodeForm, setShowNodeForm] = useState(false);
    const [showEdgeForm, setShowEdgeForm] = useState(false);

    const handleNodeFormSubmit = (data: NodeData) => {
        fetch('/api/nodes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log(data));
        setShowNodeForm(false);
      };

      const handleEdgeFormSubmit = (data: EdgeData) => {
        fetch('/api/submitEdge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log(data));
        setShowEdgeForm(false);
      };

    return (
        <div>
            <GraphCanvas />
            {/* <button onClick={() => setShowNodeForm(true)}>Add Node</button>
            {showNodeForm && <NodeForm onSubmit={handleNodeFormSubmit} />}
            <button onClick={() => setShowEdgeForm(true)}>Add Edge</button>
            {showEdgeForm && <EdgeForm onSubmit={handleEdgeFormSubmit} />} */}
            <JSONOperations />
        </div>
    );
}
