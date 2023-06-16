window.addEventListener('load', solve);

function solve() {
  //capture input elements
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const dateIn = document.querySelector('#date-in');
  const dateOut = document.querySelector('#date-out');
  const numOfGuests = document.querySelector('#people-count');
  const nextBtn = document.querySelector('#next-btn');
  const reservationInfo = document.querySelector(
    '#info-reservations > div > div > ul'
  );
  const confirmReservation = document.querySelector(
    '#confirm-reservations > div > div > ul'
  );
  const verififcation = document.querySelector('#verification');

  nextBtn.addEventListener('click', nextBtnFunc);

  function nextBtnFunc(e) {
    e.preventDefault();
    const newDateIn = new Date(dateIn.value.split('-'));
    const newDateOut = new Date(dateOut.value.split('-'));
    if (
      firstName.value === '' ||
      lastName.value === '' ||
      dateIn.value === '' ||
      dateOut.value === '' ||
      numOfGuests.value === '' ||
      newDateIn >= newDateOut
    ) {
      return;
    }

    //Create elements
    const liEl = document.createElement('li');
    const articleEl = document.createElement('article');
    const h3 = document.createElement('h3');
    const pFromDate = document.createElement('p');
    const pToDate = document.createElement('p');
    const pForPeople = document.createElement('p');
    const editBtn = document.createElement('button');
    const continueBtn = document.createElement('button');

    //Modify
    liEl.classList.add('reservation-content');
    h3.textContent = `Name: ${firstName.value} ${lastName.value}`;
    pFromDate.textContent = `From date: ${dateIn.value}`;
    pToDate.textContent = `To date: ${dateOut.value}`;
    pForPeople.textContent = `For ${numOfGuests.value} people`;
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    continueBtn.classList.add('continue-btn');
    continueBtn.textContent = 'Continue';

    //Event listeners
    editBtn.addEventListener('click', editFunc);
    continueBtn.addEventListener('click', continueFunc);

    //Attach elements
    articleEl.appendChild(h3);
    articleEl.appendChild(pFromDate);
    articleEl.appendChild(pToDate);
    articleEl.appendChild(pForPeople);

    liEl.appendChild(articleEl);
    liEl.appendChild(editBtn);
    liEl.appendChild(continueBtn);

    reservationInfo.appendChild(liEl);

    clearInputs();
    nextBtn.disabled = true;
  }

  function editFunc(e) {
    //mm/dd/yyyy => 06/16/2023
    //yyyy/mm/dd => 2023/06/16

    const toDel = e.target.parentElement;
    const data = Array.from(e.target.parentElement.children[0].children);
    const fName = data[0].textContent.split(' ')[1];
    const lName = data[0].textContent.split(' ')[2];
    const dateInArr = data[1].textContent.substring(11).split('-');
    const yyyyIn = dateInArr[0];
    const mmIn = dateInArr[1];
    const ddIn = dateInArr[2];
    const dateOutArr = data[2].textContent.substring(9).split('-');
    const yyyyOut = dateOutArr[0];
    const mmOut = dateOutArr[1];
    const ddOut = dateOutArr[2];
    const guests = data[3].textContent.split(' ')[1];
    // console.log(numOfGuests);

    firstName.value = fName;
    lastName.value = lName;
    dateIn.value = `${yyyyIn}-${mmIn}-${ddIn}`;
    dateOut.value = `${yyyyOut}-${mmOut}-${ddOut}`;
    numOfGuests.value = guests;

    toDel.remove();
    nextBtn.disabled = false;
    //
  }
  function continueFunc(e) {
    const toDel = e.target.parentElement;
    const ArticleEl = e.target.parentElement.children[0];

    const liEl = document.createElement('li');
    const confirmBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    liEl.classList.add('reservation-content');
    confirmBtn.classList.add('confirm-btn');
    confirmBtn.textContent = 'Confirm';
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';

    //Add eventListener's to the buttons
    confirmBtn.addEventListener('click', confirmFunc);
    cancelBtn.addEventListener('click', cancelFunc);

    //Attach
    liEl.appendChild(ArticleEl);
    liEl.appendChild(confirmBtn);
    liEl.appendChild(cancelBtn);

    confirmReservation.appendChild(liEl);
    toDel.remove();
  }

  function confirmFunc(e) {
    const toDel = e.target.parentElement;
    toDel.remove();
    nextBtn.disabled = false;

    const h1 = document.createElement('h1');
    h1.textContent = 'Confirmed.';
    verififcation.classList.add('reservation-confirmed');
    verififcation.appendChild(h1);
  }
  function cancelFunc(e) {
    const toDel = e.target.parentElement;
    toDel.remove();
    nextBtn.disabled = false;

    const h1 = document.createElement('h1');
    h1.textContent = 'Cancelled.';
    verififcation.classList.add('reservation-cancelled');
    verififcation.appendChild(h1);
  }

  //Helper func
  function clearInputs() {
    firstName.value = '';
    lastName.value = '';
    dateIn.value = '';
    dateOut.value = '';
    numOfGuests.value = '';
  }
}
