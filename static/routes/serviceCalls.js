axios.get('http://localhost:3000/serviceCalls')
  .then(response => {
      const serviceCall = response.data;
      const table = document.getElementById('scalls-table');

      serviceCall.forEach(ServiceCall => {
        const row = table.insertRow();
        row.innerHTML = `
          <td>${ServiceCall.unit}</td>
          <td>${ServiceCall.name}</td>
          <td>${ServiceCall.date}</td>
          <td>${ServiceCall.ot}</td>
          <td>${ServiceCall.report}</td>
        `;
      });
    
  })
  .catch(error => {
    console.error('Error fetching inspection reports:', error);
  });




const form = document.getElementById('newServiceCall-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const unit = document.getElementById("unit").value;
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const ot = document.getElementById("ot").value;
    const report = document.getElementById("report").value;

    // Create an object to hold the form data
    const data = { unit, name, date, ot, report };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };

      try {
        const response = await fetch('http://127.0.0.1:3000/newServiceCall', options);
    
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

