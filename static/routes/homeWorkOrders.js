// Make a GET request to fetch inspection reports
axios.get('http://localhost:3000/home')
  .then(response => {
    const workOrders = response.data.WorkOrders;
    const pastWorkOrders = response.data.homePastWorkOrders;
    const table = document.getElementById('homeWorkOrders-table');

   
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


  pastWorkOrders.forEach(pastWorkOrder => {
    const row2 = table.insertRow();
    row2.innerHTML = `
      <td>${pastWorkOrder._id}</td>
      <td>${pastWorkOrder.title}</td>
      <td>${pastWorkOrder.name}</td>
      <td>${pastWorkOrder.date}</td>
      <td>${pastWorkOrder.status}</td>
      <td>${pastWorkOrder.comments}</td>
      <td>${pastWorkOrder.dueDate}</td>
      <td>${pastWorkOrder.employeeReport}</td>
      <td>${pastWorkOrder.employeeName}</td>
      <td>${pastWorkOrder.dateCompleted}</td>
    `;
  });


})
  .catch(error => {
    console.error('Error fetching inspection reports:', error);
  });

  