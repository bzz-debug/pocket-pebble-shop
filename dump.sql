PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE items(
    item_id INTEGER PRIMARY KEY, 
    name VARCHAR (100), 
    price DECIMAL(10, 2),
    img_url VARCHAR

    );
INSERT INTO items VALUES(1,'Pet Portrait',20,'custom/PP.29.03.20252.jpg');
INSERT INTO items VALUES(2,'Butterfly',8,'premade/pebble-profile-picture.jpg');
INSERT INTO items VALUES(3,'Robin',5,'premade/PP.29.03.202515.jpg');
INSERT INTO items VALUES(4,'Welcome Stone',10,'premade/welcome-stone.jpg');
INSERT INTO items VALUES(5,'Large House',10,'premade/house-stone.jpg');
INSERT INTO items VALUES(6,'Small House',6,'premade/house-stone.jpg');
INSERT INTO items VALUES(7,'Sunflower',8,'premade/PP.29.03.20259.jpg');
CREATE TABLE orders(
    order_id INTEGER PRIMARY KEY,
    item_id INT REFERENCES items(item_id),
    customer_name VARCHAR,
    address VARCHAR,
    postcode VARCHAR
    
    );
CREATE TABLE admin(
    admin_id INTEGER PRIMARY KEY,
     admin_email VARCHAR,
      password VARCHAR
        
    );
INSERT INTO admin VALUES(1,'pocket-pebbles@outlook.com','$2b$10$zLMyRL2UfT9IPeGW7mOBlu9VK4B.IPRr5BfcA3AGJgUgi6zn2b2zy');
CREATE TABLE sessions (sid PRIMARY KEY, expired, sess);
COMMIT;
