const { AccountSQL, AccountMongo } = require('./db');

async function createAccount(name, password) {
  const accountSQL = await AccountSQL.create({ name, password });
  const accountMongo = await AccountMongo.create({ name, password });
  return { accountSQL, accountMongo };
}

async function getAccounts() {
  const accountsSQL = await AccountSQL.findAll();
  const accountsMongo = await AccountMongo.find();
  return { accountsSQL, accountsMongo };
}

async function getAccountByName(name) {
  const accountSQL = await AccountSQL.findOne({ where: { name } });
  const accountMongo = await AccountMongo.findOne({ name });
  return { accountSQL, accountMongo };
}

async function updateAccount(name, password) {
  const accountSQL = await getAccountByName(name).accountSQL;
  if (!accountSQL) return null;
  await accountSQL.update({ password });

  const accountMongo = await getAccountByName(name).accountMongo;
  if (!accountMongo) return null;
  await accountMongo.updateOne({ password });

  return { accountSQL, accountMongo };
}

async function deleteAccount(name) {
  const accountSQL = await getAccountByName(name).accountSQL;
  if (!accountSQL) return false;
  await accountSQL.destroy();

  const accountMongo = await getAccountByName(name).accountMongo;
  if (!accountMongo) return false;
  await accountMongo.deleteOne();

  return true;
}

module.exports = { createAccount, getAccounts, getAccountByName, updateAccount, deleteAccount };
