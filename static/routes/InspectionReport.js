const form = document.getElementById('inspectionForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const typeOfIns = document.getElementById("inspectionType").value;
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const report = document.getElementById("report").value;

  const data = { typeOfIns, name, date, status, report };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch('http://127.0.0.1:3000/inspectionReport', options);

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
