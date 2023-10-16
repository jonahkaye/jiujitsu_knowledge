// EdgeForm.tsx

import React, { useState } from 'react';
import { NodeData } from './NodeForm';
import { SimulationNodeDatum } from 'd3';


interface EdgeFormProps {
    onSubmit: (edgeData: EdgeRawData) => void;
}

export interface EdgeRawData {
    source: string;
    target: string;
    condition: string;
    description: string;
    weight?: number;
    tag?: string;
}

export interface EdgeData extends SimulationNodeDatum {
    source: NodeData;
    target: NodeData;
    condition: string;
    description: string;
    weight?: number;
    tag?: string;
}

export const EdgeForm: React.FC<EdgeFormProps> = ({ onSubmit }) => {
    const [source, setSource] = useState<string>(''); 
    const [target, setTarget] = useState<string>(''); 
    const [condition, setCondition] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [weight, setWeight] = useState<number | undefined>(undefined);
    const [tag, setTag] = useState<string | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({
            source,
            target,
            condition,
            description,
            weight,
            tag,
            // x: 0,  // initial x position
            // y: 0,  // initial y position
            // vx: 0, // initial x velocity
            // vy: 0  // initial y velocity
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Start Node ID:</label>
                <input type="text" value={typeof source === 'string' ? source : source.id} onChange={e => setSource(e.target.value)} />
            </div>
            <div>
                <label>End Node ID:</label>
                <input type="text" value={typeof target === 'string' ? target : target.id} onChange={e => setTarget(e.target.value)} />            </div>
            <div>
                <label>Condition:</label>
                <input type="text" value={condition} onChange={e => setCondition(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Weight (optional):</label>
                <input type="number" value={weight ?? ''} onChange={e => setWeight(e.target.valueAsNumber)} />
            </div>
            <div>
                <label>Tag (optional):</label>
                <input type="text" value={tag ?? ''} onChange={e => setTag(e.target.value)} />
            </div>
            <div>
                <button type="submit">Add Edge</button>
            </div>
        </form>
    );
}

export default EdgeForm;
