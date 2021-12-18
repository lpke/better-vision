function getData(projectName, serviceName, colIndex) {
  if (projectName === undefined) return undefined;

  const projects = scanProjects();

  const project = projects.find((project) => project.name === projectName);
  if (serviceName === undefined) {
    console.log(project);
    return project;
  }

  const service = project.services.find(
    (service) => service.name === serviceName
  );
  if (colIndex === undefined) {
    console.log(service);
    return service;
  }

  const value = service.colValues[colIndex];
  console.log(value);
  return value;
}
