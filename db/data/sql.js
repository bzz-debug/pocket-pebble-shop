require("dotenv").config();
const { db } = require("../../connect.js");

const seed = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS orders");
    await db.query("DROP TABLE IF EXISTS items");

    await db.query(`
      CREATE TABLE items(
      item_id SERIAL PRIMARY KEY, 
      name VARCHAR (100), 
      price DECIMAL(10, 2),
      img_url VARCHAR,
      description TEXT
  
      )`);

    await db.query(`CREATE TABLE orders(
      order_id SERIAL PRIMARY KEY,
      item_id INT REFERENCES items(item_id),
      customer_name VARCHAR,
      address VARCHAR,
      postcode VARCHAR
      
      )`);

    // await db.query(`CREATE TABLE IF NOT EXISTS admin(
    //   admin_id SERIAL PRIMARY KEY,
    //    admin_email VARCHAR,
    //     password VARCHAR

    //   )`);

    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Pet Portrait', 20, 'custom/PP.29.03.20252.jpg', NULL)
      `);

    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Butterfly', 8, 'premade/pebble-profile-picture.jpg', NULL)
      `);
    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Robin', 5, 'premade/PP.29.03.202515.jpg', NULL)
      `);
    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Welcome Stone', 10, 'premade/welcome-stone.jpg', NULL)
      `);
    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Large House', 10, 'premade/house-stone.jpg', NULL)
      `);
    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Small House', 6, 'premade/house-stone.jpg', NULL)
      `);
    await db.query(`
      INSERT INTO items(name, price, img_url, description)
      VALUES ('Sunflower', 8, 'premade/PP.29.03.20259.jpg', NULL)
      `);
  } catch (error) {
    console.log(error);
  }
};

seed();

/*don't forget to prevent against SQL injection - this becomes relevant when coding for the user input - hmmmmmmm would that be in the sales table then??? - yes - create a function which does this, 
i.e 

INSERT INTO orders (name, price etc) VALUES ($name, $price)", 
{
  $name: 'Pet Portrait',
  $price: 20
}
  ); 
so..... in the model
*/
