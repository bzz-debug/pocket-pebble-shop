const { db } = require("../../connect.js");
db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS items", (error) => {
    if (error) {
      throw error;
    }
  });

  db.run("DROP TABLE IF EXISTS orders", (error) => {
    if (error) {
      throw error;
    }
  });

  db.run(`
    CREATE TABLE items(
    item_id INTEGER PRIMARY KEY, 
    name VARCHAR (100), 
    price DECIMAL(10, 2),
    img_url VARCHAR

    )`);

  db.run(`CREATE TABLE orders(
    order_id INTEGER PRIMARY KEY,
    item_id INT REFERENCES items(item_id),
    customer_name VARCHAR,
    address VARCHAR,
    postcode VARCHAR
    
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS admin(
    admin_id INTEGER PRIMARY KEY,
     admin_email VARCHAR,
      password VARCHAR
        
    )`);

  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Pet Portrait', '20', 'custom/PP.29.03.20252.jpg')
    `);

  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Butterfly', '8', 'premade/pebble-profile-picture.jpg')
    `);
  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Robin', '5', 'premade/PP.29.03.202515.jpg')
    `);
  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Welcome Stone', '10', 'premade/welcome-stone.jpg')
    `);
  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Large House', '10', 'premade/house-stone.jpg')
    `);
  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Small House', '6', 'premade/house-stone.jpg')
    `);
  db.run(`
    INSERT INTO items(name, price, img_url)
    VALUES ('Sunflower', '8', 'premade/PP.29.03.20259.jpg')
    `);
});

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
