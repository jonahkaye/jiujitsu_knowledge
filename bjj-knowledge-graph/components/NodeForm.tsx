import React, { useState } from 'react';
import { SimulationNodeDatum } from 'd3';

interface NodeFormProps {
    onSubmit: (nodeData: NodeData) => void;
}

export interface NodeData extends SimulationNodeDatum {
    id: string | number;
    name: string;
    isSubmissionPosition: boolean;
    description: string;
    tag?: string;
    index?: number;
}

export const NodeForm: React.FC<NodeFormProps> = ({ onSubmit }) => {
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isSubmissionPosition, setIsSubmissionPosition] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [tag, setTag] = useState<string | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({
            id,
            name,
            isSubmissionPosition,
            description,
            tag,
            index: 0,
            x: 0,  // initial x position
            y: 0,  // initial y position
            vx: 0, // initial x velocity
            vy: 0  // initial y velocity
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID:</label>
                <input type="text" value={id} onChange={e => setId(e.target.value)} />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label>Is Submission Position:</label>
                <input type="checkbox" checked={isSubmissionPosition} onChange={e => setIsSubmissionPosition(e.target.checked)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Tag (optional):</label>
                <input type="text" value={tag ?? ''} onChange={e => setTag(e.target.value)} />
            </div>
            <div>
                <button type="submit">Add Node</button>
            </div>
        </form>
    );
}

export default NodeForm;
