//event listener for user-form to register new
const form = document.getElementById('signin-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try {
      const response = await fetch('http://127.0.0.1:3000/signin', options);
      
      if (response.ok) {
        alert("User Found");
        const data = await response.json();
        console.log(data);
        const user = data.user;
        console.log(user);
        alert("redirecting to Home");

        window.location.href = "http://localhost:3000/home.html";
        
        //Handle successful sign-in
        
        
      } else {
        alert("User Not Found");
        console.log("error")
        // Handle sign-in error
        console.error(response.statusText);
      }
    } catch (error) {
      console.log("Network error");
      // Handle network error
      console.error(error);
    }
  
    
});




