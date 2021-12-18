function setByName(projectName, serviceName, colIndex, value) {
  const projects = scanProjects();
  const project = projects.find((project) => project.name === projectName);
  const service = project.services.find(
    (service) => service.name === serviceName
  );
  const colNode = service.node.cols[colIndex];

  colNode.click();
  const inputNode = colNode.querySelector(':scope > input');
  inputNode.value = value;

  const returnPress = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    keyCode: 13,
  });
  inputNode.dispatchEvent(returnPress);
}
