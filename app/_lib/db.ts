// import { Query, createPool } from "mysql2";

// const pool = createPool({
//   host: 'localhost',
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB
// });

// pool.getConnection((err, conn) => {
//   if (err) console.error('Error connecting to database');

//   conn.release();
// })

// const executeQuery = (query: string, arrParams: any) => {
//   return new Promise((resolve, reject) => {
//     try {
//       pool.query(query, arrParams, (err, result) => {
//         if (err) reject(err);
//         resolve(result);
//       })
//     } catch (err) {
//       reject(err);
//     }
//   })
// }


// export default executeQuery;
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
});
connection.connect((err: any) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
module.exports = connection;