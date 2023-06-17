window.addEventListener('load', solve);

function solve() {
  //Capture elements
  const carModel = document.querySelector('#car-model');
  const carYear = document.querySelector('#car-year');
  const partName = document.querySelector('#part-name');
  const partNumber = document.querySelector('#part-number');
  const condition = document.querySelector('#condition');

  //Caputre other elements
  const nextBtn = document.querySelector('#next-btn');
  const infoListUl = document.querySelector('.info-list');
  const completeImg = document.querySelector('#complete-img');
  const completeText = document.querySelector('#complete-text');
  const confirmList = document.querySelector('.confirm-list');

  //Attach event lister to nextBtn
  nextBtn.addEventListener('click', nextFunc);

  function nextFunc(e) {
    e.preventDefault();
    //Validate the input
    if (
      carModel.value === '' ||
      carYear.value === '' ||
      partName.value === '' ||
      partNumber.value === '' ||
      condition.value === '' ||
      carYear.value < 1980 ||
      carYear.value > 2023
    ) {
      return;
    }

    //Create li and add classlist
    const liEl = document.createElement('li');
    liEl.classList.add('part-content');

    //Create article
    const article = document.createElement('article');

    //Create pModel and add textContent
    const pModel = document.createElement('p');
    pModel.textContent = `Car Model: ${carModel.value}`;

    //Create pYear and add textContent
    const pYear = document.createElement('p');
    pYear.textContent = `Car Year: ${carYear.value}`;

    //Create pName and add textContent
    const pName = document.createElement('p');
    pName.textContent = `Part Name: ${partName.value}`;

    //Create pNumber and add textContent
    const pNumber = document.createElement('p');
    pNumber.textContent = `Part Number: ${partNumber.value}`;

    //Create pCondition and add textContent
    const pCondition = document.createElement('p');
    pCondition.textContent = `Condition: ${condition.value}`;

    //Create editBtn, add  classlist, textContent and attach event listener
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', editFunc);

    //Edit functionality
    function editFunc(e) {
      //Get data
      const toDel = e.target.parentElement;
      const data = Array.from(e.target.parentElement.children[0].children);

      //Modify the input values
      carModel.value = data[0].textContent.substring(11);
      carYear.value = data[1].textContent.substring(10);
      partName.value = data[2].textContent.substring(11);
      partNumber.value = data[3].textContent.substring(13);
      condition.value = data[4].textContent.substring(11);

      //Remove the current
      toDel.remove();

      //Enable nextBtn
      nextBtn.disabled = false;
    }

    //Create editBtn, add  classlist, textContent and attach event listener
    const continueBtn = document.createElement('button');
    continueBtn.classList.add('continue-btn');
    continueBtn.textContent = 'Continue';
    continueBtn.addEventListener('click', continueFunc1);

    //continue functionality
    function continueFunc1(e) {
      //Helper console.log
      console.log('Here');

      //Get and update data
      const toDel = e.target.parentElement;
      const article = e.target.previousSibling.previousSibling;
      const li = document.createElement('li');
      li.classList.add('part-content');
      const confirmBtn = document.createElement('button');
      confirmBtn.classList.add('confirm-btn');
      confirmBtn.textContent = 'Confirm';
      confirmBtn.addEventListener('click', confirmInner);

      //confrim functionality
      function confirmInner(e) {
        //Get and delete current
        const toDel = e.target.parentElement;
        toDel.remove();

        //Enable nextBtn
        nextBtn.disabled = false;

        //Change completeImg and completeText
        completeImg.style.visibility = 'visible';
        completeText.textContent = 'Part is Ordered!';
      }

      //Create cancelBtn, add  classlist, textContent and attach event listener
      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancel-btn');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.addEventListener('click', cancelInner);

      //cancel functionality
      function cancelInner(e) {
        //Get and Remove the current
        const toDel = e.target.parentElement;
        toDel.remove();

        //Enable nextBtn
        nextBtn.disabled = false;
      }

      //Append elemtns to li
      li.appendChild(article);
      li.appendChild(confirmBtn);
      li.appendChild(cancelBtn);

      //Append to confirmLsit
      confirmList.appendChild(li);

      //Remove current
      toDel.remove();
    }
    //

    //Append to article
    article.appendChild(pModel);
    article.appendChild(pYear);
    article.appendChild(pName);
    article.appendChild(pNumber);
    article.appendChild(pCondition);

    //Append to liEl
    liEl.appendChild(article);
    liEl.appendChild(editBtn);
    liEl.appendChild(continueBtn);

    //Append li to infoListUl
    infoListUl.appendChild(liEl);

    //Change visibility
    completeImg.style.visibility = 'hidden';
    completeText.textContent = '';

    //Clear data
    clearInputs();

    //Diasable nextBtn
    nextBtn.disabled = true;
  }

  //Helper func
  function clearInputs() {
    carModel.value = '';
    carYear.value = '';
    partName.value = '';
    partNumber.value = '';
    condition.value = '';
  }
}
