async function test() {
    try {
        const loginRes = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'etudiant@exemple.com', password: 'eleve' })
        });
        const loginData = await loginRes.json();
        
        const dashRes = await fetch('http://localhost:8000/api/dashboard/etudiant', {
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        const status = dashRes.status;
        const dashData = await dashRes.json();
        console.log('Status:', status);
        console.log('Dashboard Data:', JSON.stringify(dashData).substring(0, 200) + '...');
        console.log('Success!');
    } catch(e) {
        console.error('Error:', e);
    }
}
test();
