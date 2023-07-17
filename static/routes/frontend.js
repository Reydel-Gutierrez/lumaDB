//event listener for user-form to register new
const form = document.getElementById('user-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = { name, email, password };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try {
      const response = await fetch('http://127.0.0.1:3000/signup', options);
      //const json = await response.json();
      //console.log(json);
      alert("User Created");
      window.location.href = "http://localhost:3000/signin.html";
  } catch (err) {
      console.error(err);
  }

});

