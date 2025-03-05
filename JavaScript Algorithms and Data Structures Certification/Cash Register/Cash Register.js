/* global document, window */
// Initial setup
let price = 19.50;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

// Document Object Model (DOM) elements
const cashInput = document.getElementById("cash");
const changeText = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const changeAmount = document.getElementById("change-amount");
const messageArea = document.getElementById("message-area");

// Conversion rates for each denomination
const conversion = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
};

// Function to update the change amount display in the drawer
function updateChangeAmount() {
  let changeHTML = cid.map(denom => `${denom[0]}: $${denom[1].toFixed(2)}`).join('<br>');
  changeAmount.innerHTML = changeHTML;
}

// Initial update of the change amount display
updateChangeAmount();

// Event listener for purchase button click
purchaseBtn.addEventListener("click", () => {
  // Calculate total cash in the drawer
  const totalCash = cid.reduce((sum, curr) => sum + curr[1], 0);
  
  // Get the cash input from the user and calculate change due
  const cash = Number(cashInput.value);
  let changeDue = Number((cash - price).toFixed(2));

  // Requirement: Check if customer has enough money.
  // If the cash is less than the price, alert and update the message areas.
  if (cash < price) {
    // eslint-disable-next-line no-alert
    window.alert("Customer does not have enough money to purchase the item");
    messageArea.textContent = "Customer does not have enough money to purchase the item.";
    changeText.textContent = "Customer does not have enough money to purchase the item.";
    return;
  }
  
  // If cash equals the price, no change is due
  if (cash === price) {
    changeText.textContent = "No change due - customer paid with exact cash.";
    return;
  }
  
  // Check if the total cash in the drawer exactly equals the change due
  if (Math.abs(totalCash - changeDue) < 0.01) {
    let sortedCID = cid.slice().reverse();
    let closedOutput = sortedCID
      .filter(denom => denom[1] > 0)
      .map(denom => `${denom[0]}: $${denom[1].toFixed(2)}`)
      .join(" ");
    changeText.textContent = `Status: CLOSED ${closedOutput}`;
    return;
  }
  
  // Calculate the change to be given back to the customer
  let remainingChange = changeDue;
  let changeArray = [];
  let workingCID = cid.slice().reverse();
  
  workingCID.forEach(denom => {
    const name = denom[0];
    const unit = conversion[name];
    let amountInDrawer = denom[1];
    let amountUsed = 0;
    
    // While we can still give change with this denomination, use it
    while (remainingChange >= unit - 0.0001 && amountInDrawer > 0) {
      remainingChange = Number((remainingChange - unit).toFixed(2));
      amountInDrawer = Number((amountInDrawer - unit).toFixed(2));
      amountUsed = Number((amountUsed + unit).toFixed(2));
    }
    if (amountUsed > 0) {
      changeArray.push([name, amountUsed]);
    }
  });
  
  // Check if exact change was possible
  if (remainingChange > 0) {
    changeText.textContent = "Status: INSUFFICIENT_FUNDS";
  } else {
    changeArray.sort((a, b) => conversion[b[0]] - conversion[a[0]]);
    let changeOutput = changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ");
    changeText.textContent = `Status: OPEN ${changeOutput}`;
  }

  // Update the change amount display in the drawer
  updateChangeAmount();
});
