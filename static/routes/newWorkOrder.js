const form = document.getElementById('inspectionForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const comments = document.getElementById("comments").value;
  const dueDate = document.getElementById('dueDate').value;

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
