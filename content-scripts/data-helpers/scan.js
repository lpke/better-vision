/**
 * Scans all data in the timesheet, returning a 'projects' array.
 */
function scanProjects() {
  const timeTable = document.querySelector('.x-grid3');
  const projects = [];
  const cellNodes = [];

  const projectNodes = timeTable.querySelectorAll(
    '.x-grid3-viewport .x-grid3-scroller .x-grid3-body > div'
  );

  for (
    let projectIndex = 0;
    projectIndex < projectNodes.length;
    projectIndex++
  ) {
    const projectNode = projectNodes[projectIndex];

    // getting name of project from node ID
    const elementId = projectNode.getAttribute('id');
    const name = elementId.replace(/^ext-gen\d{0,4}.*?gr-\d-/i, '');

    // do not process 'Outside activity' rows
    if (/outside activity timesheet/gi.test(name)) continue;

    // getting all services (rows) under project
    const serviceNodes = projectNode.querySelectorAll(':scope > div');
    const services = [];
    for (
      let serviceIndex = 0;
      serviceIndex < serviceNodes.length;
      serviceIndex++
    ) {
      // skip first row (project title row) and last row (project subtotal row)
      if (serviceIndex === 0 || serviceIndex === serviceNodes.length - 1)
        continue;

      const serviceParentNode = serviceNodes[serviceIndex];
      const serviceRowNode =
        serviceParentNode.querySelector('div table tbody tr');

      // getting all service column values
      const serviceColNodes = serviceRowNode.querySelectorAll(':scope > td');
      cellNodes.push(...serviceColNodes);
      const serviceColValues = [];
      for (let colIndex = 0; colIndex < serviceColNodes.length; colIndex++) {
        const serviceColNode = serviceColNodes[colIndex];
        const serviceColData = serviceColNode.querySelector('div').innerText;
        serviceColValues.push(serviceColData.trim());
        
        serviceColNode.addEventListener('focus', (e) => {
          const cell = e.target;
          const row = cell.parentNode;
          const cells = row.querySelectorAll(':scope > td');
          for (let i = 0; i < cells.length; i++) {
            const cellNode = cells[i];
            if (cellNode === cell) {
              lastCellIndex = i;
              break;
            }
          }
          console.log(lastCellIndex);
        });
      }

      const service = {
        name: serviceColValues[1],
        node: {
          parent: serviceParentNode,
          row: serviceRowNode,
          cols: serviceColNodes,
        },
        colValues: serviceColValues,
      };

      services.push(service);
    }

    const project = {
      name: name,
      node: projectNode,
      services: services,
      cellNodes: cellNodes,
    };

    projects.push(project);
  }

  console.log(projects);
  return projects;
}
