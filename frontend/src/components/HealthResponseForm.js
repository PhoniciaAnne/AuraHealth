import React, { useState } from 'react';
import axios from 'axios';

function HealthResponseForm() {
    const [location, setLocation] = useState('');
    const [healthHistory, setHealthHistory] = useState('');
    const [workEnvironment, setWorkEnvironment] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            location,
            healthHistory,
            workEnvironment
        };

        try {
            const result = await axios.post('/api/health/predict-and-respond', data);
            setResponse(result.data);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    return (
        <div>
            <h2>AI-Enhanced Health Advice</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                <input type="text" value={healthHistory} onChange={(e) => setHealthHistory(e.target.value)} placeholder="Health History" />
                <input type="text" value={workEnvironment} onChange={(e) => setWorkEnvironment(e.target.value)} placeholder="Work Environment" />
                <button type="submit">Get Personalized Advice</button>
            </form>
            {response && (
                <div>
                    <h3>Predicted Health Risk:</h3>
                    <p>{response.predictedRisk}</p>
                    <h3>AI-Generated Advice:</h3>
                    <p>{response.aiResponse}</p>
                </div>
            )}
        </div>
    );
}

export default HealthResponseForm;
