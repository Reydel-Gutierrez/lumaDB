const form = document.getElementById('inspectionForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const name = document.getElementById("name").value;
  const rawDate = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const comments = document.getElementById("comments").value;
  const rawDueDate = document.getElementById("dueDate").value;
  
  function formatDate(rawDate) {
    return rawDate.substr(0, 10);
  }


  // Format the date and dueDate before storing in the data object
  const date = formatDate(rawDate);
  const dueDate = formatDate(rawDueDate);
  
  console.log(date, dueDate);
  // Function to format the date to the desired format (e.g., "YYYY-MM-DD")
  
  
  // Create the data object
  const data = { title, name, date, status, comments, dueDate };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch('http://127.0.0.1:3000/newWorkOrder', options);

    if (response.ok) {
      alert("Inspection report submitted successfully");
      // Handle successful form submission or show a success message
    } else {
      alert("Error submitting inspection report");
      // Handle form submission error or show an error message
      console.error(response.statusText);
    }
  } catch (error) {
    alert("Network error");
    // Handle network error or show an error message
    console.error(error);
  }
});
