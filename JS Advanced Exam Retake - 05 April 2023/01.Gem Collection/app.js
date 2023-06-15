window.addEventListener('load', solve);

function solve() {
  const gemstoneName = document.querySelector('#gem-name');
  const color = document.querySelector('#color');
  const carats = document.querySelector('#carats');
  const price = document.querySelector('#price');
  const type = document.querySelector('#type');
  const AddGemBtn = document.querySelector('#add-btn');
  const previewListUl = document.querySelector('#preview-list');
  const collection = document.querySelector('#collection');

  AddGemBtn.addEventListener('click', addGemFunc);

  function addGemFunc(e) {
    e.preventDefault();
    if (
      gemstoneName.value === '' ||
      color.value === '' ||
      carats.value === '' ||
      price.value === '' ||
      type.value === ''
    ) {
      return;
    }
    //create previewListUl's li and his elements
    const liEl = createEl('li');
    liEl.classList.add('gem-info');

    const articleEl = createEl('article');

    //create h4 title
    const h4 = createEl('h4');
    h4.textContent = gemstoneName.value;

    //create color
    const colorEl = createEl('p');
    colorEl.textContent = `Color: ${color.value}`;

    //create carats
    const caratsEl = createEl('p');
    caratsEl.textContent = `Carats: ${carats.value}`;

    //create price
    const priceEl = createEl('p');
    priceEl.textContent = `Price: ${price.value}`;

    //create type
    const typeEl = createEl('p');
    typeEl.textContent = `Type: ${type.value}`;

    const saveBtnEl = createEl('button');
    saveBtnEl.classList.add('save-btn');
    saveBtnEl.textContent = 'Save to collection';
    saveBtnEl.addEventListener('click', saveFunc);

    const editBtnEl = createEl('button');
    editBtnEl.classList.add('edit-btn');
    editBtnEl.textContent = 'Edit Information';
    editBtnEl.addEventListener('click', editFunc);

    const cancelBtnEl = createEl('button');
    cancelBtnEl.classList.add('cancel-btn');
    cancelBtnEl.textContent = 'Cancel';
    cancelBtnEl.addEventListener('click', cancelFunc);

    articleEl.appendChild(h4);
    articleEl.appendChild(colorEl);
    articleEl.appendChild(caratsEl);
    articleEl.appendChild(priceEl);
    articleEl.appendChild(typeEl);

    liEl.appendChild(articleEl);
    liEl.appendChild(saveBtnEl);
    liEl.appendChild(editBtnEl);
    liEl.appendChild(cancelBtnEl);

    previewListUl.appendChild(liEl);
    clearInputs();
    AddGemBtn.disabled = true;
  }

  function editFunc(e) {
    e.preventDefault();
    const currLi = e.target.parentElement; //for del
    const currArticleEl = Array.from(
      e.target.parentElement.children[0].children
    );
    gemstoneName.value = currArticleEl[0].textContent;
    color.value = currArticleEl[1].textContent.substring(7);
    carats.value = currArticleEl[2].textContent.substring(8);
    price.value = currArticleEl[3].textContent.substring(7);
    type.value = currArticleEl[4].textContent.substring(6);
    currLi.remove();
    AddGemBtn.disabled = false;
  }
  function saveFunc(e) {
    e.preventDefault();
    const currLi = e.target.parentElement; //for del
    const currArticleEl = Array.from(
      e.target.parentElement.children[0].children
    );
    const curName = currArticleEl[0].textContent;
    const curColor = currArticleEl[1].textContent.substring(7);
    const curCarats = currArticleEl[2].textContent.substring(8);
    const curPrice = currArticleEl[3].textContent.substring(7);
    const curType = currArticleEl[4].textContent.substring(6);
    // currLi.remove();
    // collection.appendChild();

    //create elements
    const liEl = createEl('li');
    const pEl = createEl('p');
    pEl.classList.add('collection-item');
    pEl.textContent = `${curName} - Color: ${curColor}/ Carats: ${curCarats}/ Price: ${curPrice}$/ Type: ${curType}`;

    liEl.appendChild(pEl);
    collection.appendChild(liEl);
    currLi.remove();

    AddGemBtn.disabled = false;
  }
  function cancelFunc(e) {
    e.preventDefault();
    const currLi = e.target.parentElement;
    currLi.remove();
    AddGemBtn.disabled = false;
  }
  function createEl(arg) {
    const el = document.createElement(arg);
    return el;
  }
  function clearInputs() {
    gemstoneName.value = '';
    color.value = '';
    carats.value = '';
    price.value = '';
    type.value = '';
  }
}
