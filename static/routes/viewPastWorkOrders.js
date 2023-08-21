// viewPastWorkOrders.js
axios.get('http://localhost:3000/viewPastWorkOrders')
  .then(response => {
    const workOrders = response.data.pastWorkOrders;
    const table = document.getElementById('pastWorkOrders-table');

    workOrders.sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted));

    workOrders.forEach(workOrder => {
      const row = table.insertRow();

       // Format dateCompleted as YYYY-MM-DD
       const formattedDateComplete = new Date(workOrder.dateCompleted).toISOString().split('T')[0];
       const formattedDueDate = new Date(workOrder.dueDate).toISOString().split('T')[0];
       const formattedDate = new Date(workOrder.date).toISOString().split('T')[0];

      row.innerHTML = `
        <td>${workOrder._id}</td>
        <td>${workOrder.title}</td>
        <td>${workOrder.name}</td>
        <td>${formattedDate}</td>
        <td>${workOrder.status}</td>
        <td>${workOrder.comments}</td>
        <td>${formattedDueDate}</td>
        <td>${workOrder.employeeReport}</td>
        <td>${workOrder.employeeName}</td>
        <td>${formattedDateComplete}</td>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching inspection reports:', error);
  });






  //event lisener for filter

// Event listener for the "Apply" button
document.getElementById("applyButton").addEventListener("click", function() {
  // Get the selected value from the dropdown
  var selectedEmployee = document.getElementById("filterEmployee").value;

  // Call the filtering function with the selected employee value
  filterEmployees(selectedEmployee);
});

// Function to filter table rows based on the selected employee
function filterEmployees(selectedEmployee) {
  // Get all the rows of the table body
  var rows = document.querySelectorAll('#pastWorkOrders-table tbody tr');

  // Loop through each row and check if the employee name column matches the selected employee
  rows.forEach(function(row, index) {
      var employeeNameCell = row.querySelector('td:nth-child(9)'); // Select the second column (index 1)
      
      // Check if the cell for employee name exists in the row
      if (employeeNameCell) {
          var employeeName = employeeNameCell.textContent;
          
          // Log the current row's index, employee name, and visibility status
          console.log(`Row ${index}, Employee Name: ${employeeName}, Display: ${row.style.display}`);
          
          if (selectedEmployee === "" || employeeName === selectedEmployee) {
              row.classList.remove('d-none'); // Show the row if the name matches or no filter is applied
          } else {
              row.classList.add('d-none'); // Hide the row if the name does not match the filter
          }
      } else {
          // Handle the case where the cell is not found (optional)
      }
  });
}