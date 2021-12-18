function num(cssNum) {
  return parseInt(cssNum, 10);
}

function cssNum(num) {
  return `${num}px`;
}

function blurAll() {
  const tmp = document.createElement('input');
  tmp.style.position = 'fixed';
  tmp.style.height = 0;
  tmp.style.width = 0;
  document.body.appendChild(tmp);
  tmp.focus();
  document.body.removeChild(tmp);
}

function redraw(ele) {
  const display = ele.style.display;
  ele.style.display = 'none';
  ele.style.display = display;
}

function forceRedraw(ele) {
  if (!ele) return;

  var tempNode = document.createTextNode(' ');
  var display = ele.style.display;

  ele.appendChild(tempNode);
  ele.style.display = 'none';

  setTimeout(() => {
    ele.style.display = display;
    tempNode.parentNode.removeChild(tempNode);
  }, 20);
}
