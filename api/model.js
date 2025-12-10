const { db } = require("../connect.js");

exports.selectItems = () => {
  return db.query(`SELECT * FROM items`).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: `Nothing found!`,
      });
    }
    return result.rows;
  });
};

exports.selectItemById = (id) => {
  return db
    .query(`SELECT * FROM items WHERE item_id=$1`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: `Nothing found!`,
        });
      }
      return result.rows[0];
    })
    .catch((error) => {
      throw error;
    });
};

exports.addItems = (name, description, image) => {
  return db
    .query(
      `INSERT INTO items(
      name, 
      description,
      img_url
      ) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, image]
    )
    .then((result) => {
      return result.rows[0];
    });
};

//need to figure out how to get the image uploaded & translated into a URL ?

exports.addUsers = (email, password) => {
  return db
    .query(
      `
      INSERT INTO admin(
      admin_email,
      password) VALUES($1, $2)`,
      [email, password]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      throw error;
    });
};

exports.findUsers = (email) => {
  return db
    .query(
      `
      SELECT * FROM admin WHERE admin_email=$1`,
      [email]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      throw error;
    });
};

exports.findUsersById = (id) => {
  return db
    .query(
      `
      SELECT * FROM admin WHERE admin_id=$1`,
      [id]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      throw error;
    });
};
