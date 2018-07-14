const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/produtos', (req, res) =>{
    execSQLQuery('SELECT * FROM Produtos', res);
})

router.get('/produto/:id', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Produtos' + filter, res);
})

router.post('/produtos', (req, res) =>{
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    execSQLQuery(`INSERT INTO Produtos(nome, descricao, valor) VALUES('${nome}','${descricao}','${valor}')`, res);
});

router.patch('/produto/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    execSQLQuery(`UPDATE Produtos SET nome='${nome}', descricao='${descricao}', valor='${valor}' WHERE ID=${id}`, res);
})

router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Produtos WHERE ID=' + parseInt(req.params.id), res);
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'nodeapi.mysql.dbaas.com.br',
    user     : 'nodeapi',
    password : 'd12345',
    database : 'nodeapi'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}