
function submitInspection(formId) {
    // Get form data
    const form = document.getElementById(formId);
    const formData = new FormData(form);

     // Convert FormData to JSON (for logging)
     const jsonData = {};
     formData.forEach((value, key) => {
         jsonData[key] = value;
     });
 
     console.log('Form Data:', jsonData);


    //Send JSON data to a route (replace the URL with the actual route)
    fetch('/newInspection', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(jsonData)
     })

     .then(response => {
         if (response.status === 200) {
             alert('Data submitted successfully.');
             // You can perform other actions after successful submission here.
         } else {
             alert('Data submission failed.');
         }
     })
     .catch(error => {
         console.error('Error:', error);
         alert('An error occurred while submitting data.');
     });
}


// view

axios.get('http://localhost:3000/viewInspections')
  .then(response => {
    const inspections = response.data.viewInspections;
    const table = document.getElementById('viewInspections-table');

    inspections.sort((a, b) => new Date(b.date) - new Date(a.date));

    inspections.forEach(inspection => {
      const row = table.insertRow();

      row.innerHTML = `
        <td>${inspection._id}</td>
        <td>${inspection.title}</td>
        <td>${inspection.date}</td>
        <td>${inspection.name}</td>
        <td>${inspection.report}</td>
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
  var rows = document.querySelectorAll('#viewInspections-table tbody tr');

  // Loop through each row and check if the employee name column matches the selected employee
  rows.forEach(function(row, index) {
      var employeeNameCell = row.querySelector('td:nth-child(4)'); // Select the second column (index 1)
      
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