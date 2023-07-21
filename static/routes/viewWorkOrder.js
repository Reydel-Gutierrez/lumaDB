// Make a GET request to fetch inspection reports
axios.get('http://localhost:3000/viewWorkOrders')
  .then(response => {
    const workOrders = response.data.workOrders;
    const table = document.getElementById('workOrders-table');

    workOrders.forEach(workOrder => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${workOrder._id}</td>
        <td>${workOrder.title}</td>
        <td>${workOrder.name}</td>
        <td>${workOrder.date}</td>
        <td>${workOrder.status}</td>
        <td>${workOrder.comments}</td>
        <td>${workOrder.dueDate}</td>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching inspection reports:', error);
  });





//closing workOrder
const form = document.getElementById('closeForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userNumber = document.getElementById('woNumber').value;
  const userName = document.getElementById('name').value;
  const userDate = document.getElementById('date').value;
  const userReport = document.getElementById('comments').value;

  try {
    // Send a POST request to your backend server
    const response = await fetch('/pastWorkOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userNumber, userName, userDate, userReport })
    });

    if (response.ok) {
      // Success! Work order closed successfully
      const data = await response.json();
      alert(data.message);
      console.log(data.message); // Log the success message
      // Optionally, display a success message to the user on the frontend
    } else if (response.status === 404) {
      // Work order not found
      const errorData = await response.json();
      console.log(errorData.error); // Log the error message
      // Optionally, display an error message to the user on the frontend
    } else {
      // Handle other error cases
      console.error('Failed to close work order:', response.statusText);
      // Optionally, display a generic error message to the user on the frontend
    }
  } catch (error) {
    // Handle any network or server-side errors
    console.error('Error submitting form:', error);
    // Optionally, display an error message to the user on the frontend
  }

});
