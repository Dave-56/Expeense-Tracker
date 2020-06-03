const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransactions(e) {
  e.preventDefault();
  if (text.value.trim() !== '' || amount.value.trim() !== '') {
    const newTransaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(newTransaction);

    addTransactionDom(newTransaction);

    updateValues();

    updateLocalStrorage();

    console.log(transactions);

    text.value = '';
    amount.value = '';
  } else {
    alert('Please add a text and amount');
  }
}

// Add transaction to the DOM list
function addTransactionDom(newTransaction) {
  //get amount sign
  const sign = newTransaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on value
  item.classList.add(newTransaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${newTransaction.text}<span>${sign}${Math.abs(newTransaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    newTransaction.id
  })">x</button>

  `;

  list.appendChild(item);
}

// Generate random id
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// function remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStrorage();

  init();
}
//Update Local strorage
function updateLocalStrorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDom);
  //updateLocalStrorage();
  updateValues();
}

init();

form.addEventListener('submit', addTransactions);
