
CREATE DATABASE products;
\c products;

CREATE TABLE products(
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY(product_id)
);

CREATE TABLE feature(
  id INT NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR(100) NOT NULL,
  value VARCHAR(100) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE related(
  id INT NOT NULL,
  product_id INT NOT NULL,
  related_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE cart(
  id INT NOT NULL,
  user_session INT NOT NULL,
  product_id INT NOT NULL,
  active INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE styles(
  style_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  sale_price VARCHAR(100) ,
  original_price INT ,
  default_status INT ,
  PRIMARY KEY(style_id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE skus(
  id INT NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

CREATE TABLE photo(
  id INT NOT NULL,
  style_id INT NOT NULL,
  url TEXT ,
  thumbnail_url TEXT ,
  PRIMARY KEY(id),
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

\copy products from '/Users/ted777/Desktop/data/product.csv' with delimiter ',' csv header;
\copy feature from '/Users/ted777/Desktop/data/features.csv' with delimiter ',' csv header;
\copy related from '/Users/ted777/Desktop/data/related.csv' with delimiter ',' csv header;
\copy cart from '/Users/ted777/Desktop/data/cart.csv' with delimiter ',' csv header;
\copy styles from '/Users/ted777/Desktop/data/styles.csv' with delimiter ',' csv header;
\copy skus from '/Users/ted777/Desktop/data/skus.csv' with delimiter ',' csv header;
\copy photo from '/Users/ted777/Desktop/data/photos.csv' with delimiter ',' csv header;

update styles set sale_price = NULL where sale_price = 'null';

CREATE INDEX product_index ON products (product_id);
CREATE INDEX feature_index ON feature (product_id);
CREATE INDEX related_index ON related (product_id);
CREATE INDEX styles_index ON styles (product_id);
CREATE INDEX sku_index ON skus (style_id);
CREATE INDEX photo_index ON photo (style_id);


/*  Execute this file from the command line by typing:
psql -U postgres -f ./server/schema.sql
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/