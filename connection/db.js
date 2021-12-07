const mysql = require('mysql2')

const connectionPool = mysql.createPool({
    host: '192.168.64.2',
    user: 'root1',
    password: '123456',
    database: 'db_wikigames',
    multipleStatements: true
})

// connectionPool.query(
//   'SELECT * FROM tb_playlist ORDER BY id DESC',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

module.exports = connectionPool