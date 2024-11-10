import React, { useState } from 'react';
import axios from 'axios';

function HealthRiskForm() {
    const [formData, setFormData] = useState({
        StateAbbr: '',
        Category: '',
        Measure: '',
        TotalPopulation: 0,
        Low_Confidence_Limit: 0,
        High_Confidence_Limit: 0
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/health/predict-health-risk', formData);
            setPrediction(response.data.predicted_health_risk);
        } catch (error) {
            console.error("Error in prediction request:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Add form fields for StateAbbr, Category, Measure, etc. */}
                <button type="submit">Predict Health Risk</button>
            </form>
            {prediction && <p>Predicted Health Risk: {prediction}</p>}
        </div>
    );
}

export default HealthRiskForm;