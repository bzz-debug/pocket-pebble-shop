const { db } = require("../connect.js");

exports.selectItems = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM items`, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
};

exports.selectItemById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM items WHERE item_id=?`, [id], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
};
