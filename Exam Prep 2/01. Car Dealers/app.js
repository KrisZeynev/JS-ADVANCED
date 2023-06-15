window.addEventListener('load', solve);

function solve() {
  //Capture input elements
  const make = document.querySelector('#make');
  const model = document.querySelector('#model');
  const year = document.querySelector('#year');
  const fuel = document.querySelector('#fuel');
  const originalCost = document.querySelector('#original-cost');
  const sellingPrice = document.querySelector('#selling-price');

  //Capture the other elements
  const publishBtn = document.querySelector('#publish');
  const table = document.querySelector('#table-body');
  const profit = document.querySelector('#profit');
  const carsList = document.querySelector('#cars-list');

  //Publish functionality
  publishBtn.addEventListener('click', publishFunc);
  function publishFunc(e) {
    e.preventDefault();
    //If any input elements them are empty, or original price is bigger than selling price the program should not do anything
    if (
      make.value === '' ||
      model.value === '' ||
      year.value === '' ||
      fuel.value === '' ||
      originalCost.value === '' ||
      sellingPrice === '' ||
      originalCost.value > sellingPrice.value
    ) {
      return;
    }
    //Create elements
    const trEl = createEl('tr');
    const makeTd = createEl('td');
    const modelTd = createEl('td');
    const yearTd = createEl('td');
    const fuelTd = createEl('td');
    const originalCostTd = createEl('td');
    const sellingPriceTd = createEl('td');
    const btnsTd = createEl('td');
    const editBtn = createEl('button');
    const sellBtn = createEl('button');

    //Modify elements
    makeTd.textContent = make.value;
    modelTd.textContent = model.value;
    yearTd.textContent = year.value;
    fuelTd.textContent = fuel.value;
    originalCostTd.textContent = Number(originalCost.value);
    sellingPriceTd.textContent = Number(sellingPrice.value);

    //Add classList to elements
    trEl.classList.add('row');
    editBtn.classList.add('action-btn', 'edit');
    editBtn.textContent = 'Edit';
    sellBtn.classList.add('action-btn', 'sell');
    sellBtn.textContent = 'Sell';

    //Add function to edit and sell buttons
    editBtn.addEventListener('click', editFunc);
    sellBtn.addEventListener('click', sellFunc);

    //Attach elements to trEl
    btnsTd.appendChild(editBtn);
    btnsTd.appendChild(sellBtn);
    trEl.appendChild(makeTd);
    trEl.appendChild(modelTd);
    trEl.appendChild(yearTd);
    trEl.appendChild(fuelTd);
    trEl.appendChild(originalCostTd);
    trEl.appendChild(sellingPriceTd);
    trEl.appendChild(btnsTd);

    //Attach elements to tbody
    table.appendChild(trEl);

    //clear input
    clearInput();
  }

  //Helper func
  function createEl(arg) {
    const el = document.createElement(arg);
    return el;
  }
  function clearInput() {
    make.value = '';
    model.value = '';
    year.value = '';
    fuel.value = '';
    originalCost.value = '';
    sellingPrice.value = '';
  }

  //Btn func's
  function editFunc(e) {
    //Capture data
    const trToDel = e.target.parentElement.parentElement;
    const data = Array.from(trToDel.children);

    //Modify elements
    make.value = data[0].textContent;
    model.value = data[1].textContent;
    year.value = data[2].textContent;
    fuel.value = data[3].textContent;
    originalCost.value = data[4].textContent;
    sellingPrice.value = data[5].textContent;

    //Remove the current tr
    trToDel.remove();
  }
  function sellFunc(e) {
    //Capture data
    const trToDel = e.target.parentElement.parentElement;
    const data = Array.from(trToDel.children);

    //Create elements
    const li = createEl('li');
    makeModelSpan = createEl('span');
    yearSpan = createEl('span');
    profitSpan = createEl('span');

    //Modify elements
    li.classList.add('each-list');
    makeModelSpan.textContent = `${data[0].textContent} ${data[1].textContent}`;
    yearSpan.textContent = data[2].textContent;
    profitSpan.textContent =
      Number(data[5].textContent) - Number(data[4].textContent);

    //Append elements
    li.appendChild(makeModelSpan);
    li.appendChild(yearSpan);
    li.appendChild(profitSpan);
    carsList.appendChild(li);

    //Remove current tr
    trToDel.remove();

    //Increasing the profit

    profit.textContent = (
      Number(profit.textContent) + Number(profitSpan.textContent)
    ).toFixed(2);
  }
}
