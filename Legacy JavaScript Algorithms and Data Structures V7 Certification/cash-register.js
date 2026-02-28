// Calculates change due from a cash transaction, returning a status of OPEN, CLOSED, or INSUFFICIENT_FUNDS along with the change breakdown.
function checkCashRegister(price, cash, cid) {
  // Currency denominations in cents, ordered highest to lowest
  const DENOMS = [
    { name: "ONE HUNDRED", val: 10000 },
    { name: "TWENTY", val: 2000 },
    { name: "TEN", val: 1000 },
    { name: "FIVE", val: 500 },
    { name: "ONE", val: 100 },
    { name: "QUARTER", val: 25 },
    { name: "DIME", val: 10 },
    { name: "NICKEL", val: 5 },
    { name: "PENNY", val: 1 }
  ];

  // Convert to cents
  let changeDue = Math.round((cash - price) * 100);
  const cidMap = Object.fromEntries(cid.map(([k, v]) => [k, Math.round(v * 100)]));
  const totalCid = Object.values(cidMap).reduce((s, a) => s + a, 0);

  // Insufficient funds or exact change cases
  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  const change = [];

  // Greedily assign the highest denominations first
  for (const denom of DENOMS) {
    const name = denom.name;
    const value = denom.val;
    let amountFromDrawer = cidMap[name] || 0;
    if (changeDue >= value && amountFromDrawer > 0) {
      // Determine the largest value available to return using this denomination
      const maxNeeded = Math.floor(changeDue / value) * value;
      const take = Math.min(maxNeeded, amountFromDrawer);
      if (take > 0) {
        change.push([name, parseFloat((take / 100).toFixed(2))]);
        changeDue -= take;
      }
    }
  }

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change };
}
