CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary VARCHAR(300),
  body VARCHAR(600),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response VARCHAR(200),
  helpfulness INT
);

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id INT REFERENCES reviews(id),
  url VARCHAR(250)
);

CREATE TABLE characteristics (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT,
  name VARCHAR(10)
);

CREATE TABLE characteristic_reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  characteristics_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value INT
);


COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/toandao/Desktop/reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos(id, review_id, url) FROM '/Users/toandao/Desktop/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics(id, product_id, name) FROM '/Users/toandao/Desktop/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews(id, characteristics_id, review_id, value) FROM '/Users/toandao/Desktop/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

/* change data in date column to match api */
ALTER TABLE reviews ALTER COLUMN date TYPE timestamp USING (to_timestamp(date::decimal/1000) AT TIME ZONE 'UTC');

/* create indexes */
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_photos_review_id ON photos(review_id);
