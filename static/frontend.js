const form = document.getElementById('user-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(name);

  const data = { name, email, password };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
      const response = await fetch('http://127.0.0.1:3000/user', options);
      const json = await response.json();
      console.log(json);
  } catch (err) {
      console.error(err);
  }

});