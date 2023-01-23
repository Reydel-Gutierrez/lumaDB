function userPostFetch(){

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { name, email, password };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch('http://localhost:3000/user', options);
        const json = await response.json();
        console.log(json);
    } catch (err) {
        console.error(err);
    }
    
}