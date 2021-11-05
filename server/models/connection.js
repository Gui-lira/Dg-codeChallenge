const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connection = async () => {
  if (db) return Promise.resolve(db);
  const conn = await MongoClient.connect(URL, OPTIONS);
  db = await conn.db('DgRepublic');
  return db;
};

module.exports = connection;
