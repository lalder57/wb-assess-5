-- PROBLEM 1
SELECT email
FROM customers
ORDER BY email;

-- PROBLEM 2
SELECT id
FROM orders
WHERE customer_id = (
  SELECT id
FROM customers
WHERE fname = 'Elizabeth' AND lname = 'Crocker'
  );

-- PROBLEM 3
SELECT SUM(num_cupcakes)
FROM orders
 WHERE processed = false;

-- PROBLEM 4
SELECT cupcakes.name, SUM(num_cupcakes) 
FROM cupcakes
 LEFT JOIN orders
  ON (cupcakes.id = orders.cupcake_id)
GROUP BY cupcakes.name
ORDER BY cupcakes.name;

-- PROBLEM 5
SELECT customers.email, SUM(num_cupcakes) AS total
FROM customers
 LEFT JOIN orders 
  ON (customers.id = orders.customer_id)
GROUP BY customers.email
ORDER BY total DESC;


-- PROBLEM 6
SELECT customers.fname, customers.lname, customers.email
FROM customers
 LEFT JOIN orders 
  ON (customers.id = orders.customer_id)
WHERE orders.cupcake_id = 5 AND orders.processed = true
GROUP BY customers.fname, customers.lname, customers.email;