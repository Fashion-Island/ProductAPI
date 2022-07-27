CREATE DATABASE products;
\c products;

CREATE TABLE products (
  product_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY(product_id)
);

CREATE TABLE feature (
  id INT NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE related (
  id INT NOT NULL,
  product_id INT NOT NULL,
  related_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE cart (
  id INT NOT NULL,
  user_session INT NOT NULL,
  product_id INT NOT NULL,
  active INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE styles (
  style_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  sale_price INT NOT NULL,
  original_price INT NOT NULL,
  default_status INT NOT NULL,
  PRIMARY KEY(style_id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE skus (
  id INT NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

CREATE TABLE photo (
  id INT NOT NULL,
  style_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);


/*  Execute this file from the command line by typing:
psql -U postgres -f ./server/schema.sql
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/