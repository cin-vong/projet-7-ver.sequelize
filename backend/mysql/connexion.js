const mysql = require('mysql');
const dbParams = require('./dbParams');

const dbConnect = mysql.createConnection(dbParams);

module.exports = dbConnect