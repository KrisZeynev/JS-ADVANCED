window.addEventListener('load', solve);

function solve() {
  const title = document.querySelector('#post-title');
  const category = document.querySelector('#post-category');
  const content = document.querySelector('#post-content');
  const publishBtn = document.querySelector('#publish-btn');
  const reviewList = document.querySelector('#review-list');
  const publishedList = document.querySelector('#published-list');
  const clearBtn = document.querySelector('#clear-btn');

  publishBtn.addEventListener('click', publishFunc);

  function publishFunc(e) {
    e.preventDefault();
    if (title.value === '' || category.value === '' || content.value === '') {
      return;
    }
    const liEl = createEl('li');
    liEl.classList.add('rpost');

    const articleEl = createEl('article');

    const h4El = createEl('h4');
    h4El.textContent = title.value;

    const categoryEl = createEl('p');
    categoryEl.textContent = `Category: ${category.value}`;

    const contentEl = createEl('p');
    contentEl.textContent = `Content: ${content.value}`;

    const editBtn = createEl('button');
    editBtn.classList.add('action-btn', 'edit');
    editBtn.textContent = 'EDIT';
    editBtn.addEventListener('click', editFunc);

    const approveBtn = createEl('button');
    approveBtn.classList.add('action-btn', 'approve');
    approveBtn.textContent = 'APPROVE';
    approveBtn.addEventListener('click', approveFunc);

    articleEl.appendChild(h4El);
    articleEl.appendChild(categoryEl);
    articleEl.appendChild(contentEl);

    liEl.appendChild(articleEl);
    liEl.appendChild(approveBtn);
    liEl.appendChild(editBtn);
    reviewList.appendChild(liEl);
    clearInputs();
  }
  function createEl(arg) {
    const el = document.createElement(arg);
    return el;
  }
  function clearInputs() {
    title.value = '';
    category.value = '';
    content.value = '';
  }
  function editFunc(e) {
    e.preventDefault();
    const currLi = e.target.parentElement;
    const currTitle =
      e.target.parentElement.children[0].children[0].textContent;
    const currCategory =
      e.target.parentElement.children[0].children[1].textContent;
    const currContent =
      e.target.parentElement.children[0].children[2].textContent;
    title.value = currTitle;
    category.value = currCategory.substring(10);
    content.value = currContent.substring(9);
    currLi.remove();
  }
  function approveFunc(e) {
    e.preventDefault();
    const currLi = e.target.parentElement;
    const currTitle =
      e.target.parentElement.children[0].children[0].textContent;
    const currCategory =
      e.target.parentElement.children[0].children[1].textContent;
    const currContent =
      e.target.parentElement.children[0].children[2].textContent;

    const liEl = createEl('li');
    liEl.classList.add('rpost');

    const articleEl = createEl('article');

    const h4El = createEl('h4');
    h4El.textContent = currTitle;

    const categoryEl = createEl('p');
    categoryEl.textContent = currCategory;

    const contentEl = createEl('p');
    contentEl.textContent = currContent;

    articleEl.appendChild(h4El);
    articleEl.appendChild(categoryEl);
    articleEl.appendChild(contentEl);

    liEl.appendChild(articleEl);

    publishedList.appendChild(liEl);

    currLi.remove();
  }
  clearBtn.addEventListener('click', clearFunc);
  function clearFunc(e) {
    e.preventDefault();
    // const toDel = Array.from(e.target.parentElement.children[1].children);
    // toDel.forEach((element) => {
    //   element.remove();
    // });
    const toDel = Array.from(publishedList.children);
    toDel.forEach((element) => element.remove());
  }
}
