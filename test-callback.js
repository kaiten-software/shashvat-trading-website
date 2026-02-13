
(async () => {
    try {
        console.log("Testing POST /api/callbacks...");
        const res = await fetch('http://localhost:3000/api/callbacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                city: 'Test City',
                requirement: 'Need plastic'
            })
        });
        const data = await res.json();
        console.log('POST Response:', data);

        console.log("Testing GET /api/callbacks...");
        const res2 = await fetch('http://localhost:3000/api/callbacks');
        const data2 = await res2.json();
        console.log('GET Response:', data2);

    } catch (e) {
        console.error('Test failed:', e);
    }
})();
