const express = require("express")
const app = express()
const port = 3000

var mysql      = require('mysql');
const dbConfig = {
  host     : 'db',
  user     : 'root',
  password : 'root',
  database : 'nodedb'
};

var connection = mysql.createConnection(dbConfig);

connection.query(`
  CREATE TABLE IF NOT EXISTS people (
    id serial primary key,
    name varchar(255)
  );
`);

app.get('/*', async (req, res) => {
  if (req.params[0] === 'favicon.ico') {
    res.send(`<h1>Full Cycle Rocks!!</h1>`);
    return;
  }

  const name = req.params[0] || 'Marcelo';

  await connection.query(`INSERT INTO people (name) VALUES ('${name}')`);

  await connection.query('SELECT name from people', function (error, names) {
    let html = '';

    names.forEach((name) => {
      html += `<p>${name.name}</p>`;
    });

    res.send(`<h1>Full Cycle Rocks!!</h1> ${html}`)
  });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})