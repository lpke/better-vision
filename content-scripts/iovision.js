const body = document.body;

const setButton = document.createElement('button');
setButton.innerText = 'Set Data';
setButton.addEventListener('click', (e) => {
  e.preventDefault();
  setByName(
    'ACIDGREEN - 2021/07/008 - Acidgreen 2021: Training',
    "TRAIN2 - TRAIN2 - Training - Devs + TL's",
    4,
    '1'
  );
});
body.insertBefore(setButton, body.firstChild);

const getButton = document.createElement('button');
getButton.innerText = 'Get Data';
getButton.addEventListener('click', (e) => {
  e.preventDefault();
  getData(
    'ACIDGREEN - 2021/07/008 - Acidgreen 2021: Training',
    "TRAIN2 - TRAIN2 - Training - Devs + TL's",
    3
  );
});
body.insertBefore(getButton, body.firstChild);

const scanButton = document.createElement('button');
scanButton.innerText = 'Scan Projects';
scanButton.addEventListener('click', (e) => {
  e.preventDefault();
  scanProjects();
});
body.insertBefore(scanButton, body.firstChild);

// ===== Handling cell changes =====

let lastCellIndex;
let lastRow;
let lastInputParent; // the div above input
let lastInput; // the obscure input element that shows when editing
let inputFocusing = false;
let committing = false;

const gridBody = document.querySelector('.x-grid3-body');
const input = document.createElement('input');
input.style.position = 'absolute';
input.style.zIndex = 50000;
input.style.top = 0;
input.style.left = 0;
input.style.display = 'none';
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    committing = true;

    const fancyValue = e.target.value;
    console.log(`fancyValue: ${fancyValue}`);

    // process fancy to days...
    const value = fancyValue;
    console.log(`value: ${value}`);

    setTimeout(() => {
      input.blur();
      const lastCell = lastRow.querySelectorAll('table tbody > tr > td')[
        lastCellIndex
      ];

      setTimeout(() => {
        lastCell.click();
        lastInput.value = value;
        setTimeout(() => {
          const returnPress = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            keyCode: 13,
          });
          lastInput.dispatchEvent(returnPress);
        }, 40);
      }, 40);

      setTimeout(() => {
        committing = false;
      }, 80);
    }, 50);
  }
});
input.addEventListener('blur', (e) => {
  if (!inputFocusing) {
    input.style.display = 'none';
    input.value = '';
  }
});

setTimeout(() => {
  gridBody.insertBefore(input, gridBody.lastChild);
}, 600);

// Storing clicks for table reference
// const observer = new MutationObserver((mutations, thisObserver) => {
//   console.log()
// });

// Watching for new input elements on the x layer
const observer = new MutationObserver((mutations, thisObserver) => {
  // attempt to find a mutation that indicates a cell click
  const editMutation = mutations.find((mutation) =>
    mutation.target.getAttribute('class').includes('x-grid-editor')
  );
  const editTarget = editMutation?.target;

  const rowMutation = mutations.find((mutation) =>
    mutation.target.getAttribute('class').includes('x-grid3-row')
  );
  const rowTarget = rowMutation?.target;

  // if mutation captures clicked row, update lastRow
  if (rowTarget) {
    lastRow = rowTarget;
    setTimeout(() => {
      scanProjects();
    }, 20);
  }

  // if mutation is a cell click, add listener to the input
  if (editTarget) {
    const inputNode = editTarget.querySelector(':scope > input');
    lastInputParent = editTarget;
    lastInput = inputNode;

    inputNode.addEventListener('focus', (e) => {
      if (!committing) {
        const top = editTarget.style.top;
        const left = editTarget.style.left;
        const width = inputNode.clientWidth;
        const height = inputNode.clientHeight;
        input.style.display = 'block';
        // input.style.top = cssNum(num(top) - num(height));
        // input.style.left = cssNum(num(left) - num(width));
        input.style.top = top;
        input.style.left = left;
        input.style.width = `${width}px`;
        input.style.height = `${height}px`;

        // forcing focus on custom input
        const focusDelay = 20;
        const focusInput = () => {
          inputFocusing = true;
          input.focus();
          input.click();
          setTimeout(() => {
            input.focus();
            input.click();
            inputFocusing = false;
          }, focusDelay);
        };
        focusInput();
      }
    });
  }
});
observer.observe(document, {
  childList: true,
  subtree: true,
});
