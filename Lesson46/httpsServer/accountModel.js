const accounts = [];

function createAccount(name, password) {
  const account = { name, password };
  accounts.push(account);
  return account;
}

function getAccounts() {
  return accounts;
}

function getAccountByName(name) {
  return accounts.find(acc => acc.name === name);
}

function updateAccount(name, password) {
  const account = getAccountByName(name);
  if (!account) return null;
  account.password = password;
  return account;
}

function deleteAccount(name) {
  const index = accounts.findIndex(acc => acc.name === name);
  if (index === -1) return false;
  accounts.splice(index, 1);
  return true;
}

module.exports = { createAccount, getAccounts, getAccountByName, updateAccount, deleteAccount };
