import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [dailyTip, setDailyTip] = useState("Stay hydrated and wash your hands regularly!");

    useEffect(() => {
        // Placeholder effect to simulate fetching daily tip or health trend
        const fetchDailyTip = async () => {
            // Ideally, you would fetch this from an API endpoint
            setDailyTip("Today's Tip: Regular exercise helps boost immunity.");
        };
        fetchDailyTip();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>Daily Health Tip</h3>
                <p>{dailyTip}</p>
            </div>
        </div>
    );
}

export default Dashboard;
