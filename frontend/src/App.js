import React from 'react';
import SignupSurvey from './components/SignupSurvey';
import HealthRiskForm from './components/HealthRiskForm';
import Dashboard from './components/Dashboard';
import HealthResponseForm from './components/HealthResponseForm';

function App() {
    return (
        <div>
            <h1>Health Platform with AI-Powered Insights</h1>
            <SignupSurvey />
            <HealthRiskForm />
            <Dashboard />
            <HealthResponseForm />
        </div>
    );
}

export default App;
