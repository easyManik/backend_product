const { Client } = require("pg");
var conString =
  "postgres://einqysnh:Uy88TWmIhy-jA-B_PFXN9oSWolwQBJGo@ruby.db.elephantsql.com/einqysnh";
const client = new Client(conString);

client.connect();
module.exports = client;
