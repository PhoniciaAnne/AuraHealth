import React, { useState } from 'react';
import axios from 'axios';

function SignupSurvey() {
    const [location, setLocation] = useState('');
    const [healthHistory, setHealthHistory] = useState('');
    const [workEnvironment, setWorkEnvironment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/signup', {
                location,
                healthHistory,
                workEnvironment,
            });
            alert("Sign-up successful!");
        } catch (error) {
            console.error("Error during sign-up:", error);
        }
    };

    return (
        <div>
            <h2>Sign-Up Survey</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                <input type="text" value={healthHistory} onChange={(e) => setHealthHistory(e.target.value)} placeholder="Health History" />
                <input type="text" value={workEnvironment} onChange={(e) => setWorkEnvironment(e.target.value)} placeholder="Work Environment" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignupSurvey;
