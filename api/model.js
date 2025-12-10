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

exports.addItems = (name, description, image) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO items(
      name, 
      description,
      img_url
      )`);
  });
};

//need to figure out how to get the image uploaded & translated into a URL ?

exports.addUsers = (email, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO admin(
      admin_email,
      password) VALUES($email, $password)`,
      {
        $email: email,
        $password: password,
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`${email} added!`);
        }
      }
    );
  });
};

exports.findUsers = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT * FROM admin WHERE admin_email=?`,
      [email],
      (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

exports.findUsersById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT * FROM admin WHERE admin_id=?`,
      [id],
      (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
