// Get elements from the DOM
const transactionForm = document.getElementById('transaction-form');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const balanceElement = document.getElementById('balance');

// Initialize transactions array
let transactions = [];

// Function to add a new transaction
function addTransaction(event) {
  event.preventDefault(); // Prevent form submission

  const type = typeInput.value;
  const description = descriptionInput.value;
  const amount = +amountInput.value; // Convert to number

  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter a valid description and amount');
    return;
  }

  const transaction = {
    type,
    description,
    amount
  };

  transactions.push(transaction);
  updateTransactionList();
  updateBalance();

  // Clear form inputs
  descriptionInput.value = '';
  amountInput.value = '';
}

// Function to update the transaction list
function updateTransactionList() {
  transactionList.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${transaction.type}</span>
      <span>${transaction.description}</span>
      <span>${transaction.amount}</span>
      <button onclick="editTransaction(${index})">Edit</button>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;
    transactionList.appendChild(li);
  });
}

// Function to edit a transaction
function editTransaction(index) {
  const transaction = transactions[index];
  typeInput.value = transaction.type;
  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;

  transactions.splice(index, 1);
  updateTransactionList();
  updateBalance();
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateTransactionList();
  updateBalance();
}

// Function to update the balance
function updateBalance() {
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpense;
  balanceElement.textContent = balance;
}

// Event listener for form submission
transactionForm.addEventListener('submit', addTransaction);
