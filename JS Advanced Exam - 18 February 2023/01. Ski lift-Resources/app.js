window.addEventListener('load', solve);

function solve() {
  //Capture the elements
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const numberOfPeople = document.querySelector('#people-count');
  const fromDate = document.querySelector('#from-date');
  const days = document.querySelector('#days-count');
  const nextStepBtn = document.querySelector('#next-btn');
  const ticketInfoUl = document.querySelector('#info-ticket > div > div > ul');
  const confirmTicket = document.querySelector(
    '#confirm-ticket-section > div > div > ul'
  );
  const main = document.querySelector('#main');
  const body = document.querySelector('#body');

  //Add eventListener to main Btn

  nextStepBtn.addEventListener('click', nextStepFunc);

  function nextStepFunc(e) {
    //Prevent Default
    e.preventDefault();

    //Validate data
    if (
      firstName.value === '' ||
      lastName.value === '' ||
      numberOfPeople.value === '' ||
      fromDate.value === '' ||
      days.value === ''
    ) {
      return;
    }

    //Create elements
    const liEl = document.createElement('li');
    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    const pFromDate = document.createElement('p');
    const pDays = document.createElement('p');
    const pPeople = document.createElement('p');
    const editBtn = document.createElement('button');
    const continueBtn = document.createElement('button');

    //update elements
    liEl.classList.add('ticket');
    h3.textContent = `Name: ${firstName.value} ${lastName.value}`;
    pFromDate.textContent = `From date: ${fromDate.value}`;
    pDays.textContent = `For ${days.value} days`;
    pPeople.textContent = `For ${numberOfPeople.value} people`;

    //Update editBtn
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', editFunc);

    //Update continue btn
    continueBtn.classList.add('continue-btn');
    continueBtn.textContent = 'Continue';
    continueBtn.addEventListener('click', continueFunc);

    //Append article elements
    article.appendChild(h3);
    article.appendChild(pFromDate);
    article.appendChild(pDays);
    article.appendChild(pPeople);

    //Append elemetns to liEl
    liEl.appendChild(article);
    liEl.appendChild(editBtn);
    liEl.appendChild(continueBtn);

    //Append li to main el for liE;
    ticketInfoUl.appendChild(liEl);

    //Disable btn
    nextStepBtn.disabled = true;

    //Invoke clearInputs() func to remove all input data
    clearInputs();
  }

  //Helper func
  function clearInputs() {
    firstName.value = '';
    lastName.value = '';
    numberOfPeople.value = '';
    fromDate.value = '';
    days.value = '';
  }

  //Additonal functions
  function editFunc(e) {
    //Helper info for data
    //06/10/23
    //mm/dd/yy
    //06/08/2023
    //yy/mm/dd
    //2023/06/08
    //

    //Get elements
    const toDel = e.target.parentElement;
    const data = Array.from(e.target.parentElement.children[0].children);
    const nameArr = data[0].textContent.split(' ');
    const fName = nameArr[1];
    const lName = nameArr[2];
    const fromDateArr = data[1].textContent.substring(11).split('-');
    const mm = fromDateArr[1];
    const dd = fromDateArr[2];
    const yy = fromDateArr[0];
    const forDayArr = data[2].textContent.split(' ');
    const curDays = forDayArr[1];
    const forPeopleArr = data[3].textContent.split(' ');
    const curPeople = forPeopleArr[1];

    //Update the initials input fields
    firstName.value = fName;
    lastName.value = lName;
    numberOfPeople.value = curPeople;
    fromDate.value = `${yy}-${mm}-${dd}`; //yy/mm/dd
    days.value = curDays;

    //Remove current liEl
    toDel.remove();

    //Enable nextStepBtn
    nextStepBtn.disabled = false;
  }
  function continueFunc(e) {
    //Create elements and get fdata
    const toDel = e.target.parentElement;
    const data = e.target.parentElement.children[0];
    const liEl = document.createElement('li');
    const confirmBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    //Update liEl
    liEl.classList.add('ticket-content');

    //Update confirmBtn
    confirmBtn.classList.add('confirm-btn');
    confirmBtn.textContent = 'Confirm';

    //Update cancelBtn
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';

    //Add eventListeners to the buttons
    confirmBtn.addEventListener('click', confirmTicketFunc);
    cancelBtn.addEventListener('click', cancelTicketFunc);

    //Append data to liEl
    liEl.appendChild(data);
    liEl.appendChild(confirmBtn);
    liEl.appendChild(cancelBtn);
    confirmTicket.appendChild(liEl);

    //Remove current el => toDel element
    toDel.remove();
  }

  function confirmTicketFunc(e) {
    //Remove main
    main.remove();

    //Create elements
    const h1 = document.createElement('h1');
    const backBtn = document.createElement('button');

    //Update h1
    h1.id = 'thank-you';
    h1.textContent = 'Thank you, have a nice day!';

    //Update backBtn
    backBtn.id = 'back-btn';
    backBtn.textContent = 'Back ';

    //Add eventListener to bakcBtn
    backBtn.addEventListener('click', backFunc);

    //Append elements to body
    body.appendChild(h1);
    body.appendChild(backBtn);
  }

  function cancelTicketFunc(e) {
    //Create element to delete
    const toDel = e.target.parentElement;

    //Delete the element
    toDel.remove();

    //Enable nextStepBtn
    nextStepBtn.disabled = false;
  }

  function backFunc() {
    //Reload the page
    window.location.reload();
  }
}
