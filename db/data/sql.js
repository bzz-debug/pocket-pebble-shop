import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./db.sqlite");
db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Custom", (error) => {
    if (error) {
      throw error;
    }
  });

  db.run(`
    CREATE TABLE items(
    item_id INTEGER PRIMARY KEY, 
    name VARCHAR (100), 
    price DECIMAL(10, 2)
    )`);

  db.run(`CREATE TABLE orders(
    order_id INTEGER PRIMARY KEY,
    item_id INT REFERENCES items(item_id),
    customer_name VARCHAR,
    address VARCHAR,
    postcode VARCHAR
    
    )`);

  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Pet Portrait', '20')
    `);

  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Butterfly', '8')
    `);
  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Robin', '5')
    `);
  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Welcome Stone', '10')
    `);
  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Large House', '10')
    `);
  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Small House', '6')
    `);
  db.run(`
    INSERT INTO items(name, price)
    VALUES ('Sunflower', '8')
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
