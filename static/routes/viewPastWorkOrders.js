axios.get('http://localhost:3000/viewPastWorkOrders')
  .then(response => {
    const workOrders = response.data.pastWorkOrders;
    const table = document.getElementById('pastWorkOrders-table');

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
        <td>${workOrder.employeeReport}</td>
        <td>${workOrder.employeeName}</td>
        <td>${workOrder.dateCompleted}</td>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching inspection reports:', error);
  });