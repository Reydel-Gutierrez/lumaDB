// Make a GET request to fetch inspection reports
axios.get('http://localhost:3000/inspectionReports')
  .then(response => {
    const reports = response.data.reports;
    const table = document.getElementById('report-table');

    reports.forEach(report => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${report._id}</td>
        <td>${report.typeOfIns}</td>
        <td>${report.name}</td>
        <td>${report.date}</td>
        <td>${report.status}</td>
        <td>${report.report}</td>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching inspection reports:', error);
  });