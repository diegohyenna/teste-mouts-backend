const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8081;
const mysql = require("mysql");
const { env } = require("./src/credentials/config");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.get("/", (req, res) =>
  res.json({ message: "API para o teste da Mount's" })
);

//ESTADOS
router.get("/estados", (req, res) => {
  execSQLQuery("SELECT * FROM ufs", res, true);
});

router.get("/estados/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id)))
    return res.json({
      error: "Tipo de parametro errado, deve ser um inteiro!",
    });
  let filter = " WHERE UF_ID=" + parseInt(id);
  execSQLQuery("SELECT * FROM ufs" + filter, res, true);
});

router.post("/estado-por-nome", (req, res) => {
  const name = req.body.nome;
  let filter = "";
  if (!name) return res.json({ error: "falta o parametro de entrada 'nome'" });
  filter = " WHERE UF_NOME LIKE '%" + name + "%'";
  execSQLQuery("SELECT * FROM ufs" + filter, res, true);
});

router.post("/estados", (req, res) => {
  const name = req.body.nome;
  const sigla = req.body.sigla;

  if (!name) return res.json({ error: "falta o parametro de entrada 'nome'" });
  if (!sigla)
    return res.json({ error: "falta o parametro de entrada 'sigla'" });

  execSQLQuery(
    `INSERT INTO ufs(UF_NOME, UF_SIGLA) VALUES('${name}','${sigla}')`,
    res
  );
});

router.put("/estados/:id", (req, res) => {
  const id = req.params.id;
  let name = req.body.nome;
  let sigla = req.body.sigla;

  if (!id) return res.json({ error: "falta o parametro de entrada 'id'" });

  name = name ? `UF_NOME='${name}' ` : "";
  sigla = sigla ? `UF_SIGLA='${sigla}' ` : "";

  let columns = name || sigla ? name + sigla : "";

  if (!columns) {
    return res.json({
      error: "você não informou os campos que devem sofrer alteração!'",
    });
  } else {
    execSQLQuery(`UPDATE ufs SET ${columns} WHERE UF_ID = ${id}`, res);
  }
});

router.delete("/estados/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id)))
    return res.json({
      error: "Tipo de parametro errado, deve ser um inteiro!",
    });
  let filter = " WHERE UF_ID=" + parseInt(id);
  execSQLQuery("DELETE FROM ufs" + filter, res);
});

//PREFEITOS
router.get("/prefeitos", (req, res) => {
  execSQLQuery("SELECT * FROM prefeitos", res, true);
});

router.get("/prefeitos/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id)))
    return res.json({
      error: "Tipo de parametro errado, deve ser um inteiro!",
    });
  let filter = " WHERE PRE_ID=" + parseInt(id);
  execSQLQuery("SELECT * FROM prefeitos" + filter, res, true);
});

router.post("/prefeito-por-nome", (req, res) => {
  const name = req.body.nome;
  let filter = "";
  if (!name) return res.json({ error: "falta o parametro de entrada 'nome'" });
  filter = " WHERE PRE_NOME LIKE '%" + name + "%'";
  execSQLQuery("SELECT * FROM prefeitos" + filter, res, true);
});

router.post("/prefeitos", (req, res) => {
  const name = req.body.nome;

  if (!name) return res.json({ error: "falta o parametro de entrada 'nome'" });

  execSQLQuery(`INSERT INTO prefeitos(PRE_NOME) VALUES('${name}')`, res);
});

router.put("/prefeitos/:id", (req, res) => {
  const id = req.params.id;
  let name = req.body.nome;

  if (!id) return res.json({ error: "falta o parametro de entrada 'id'" });

  name = name ? `PRE_NOME='${name}' ` : "";

  let columns = name ? name : "";

  if (!columns) {
    return res.json({
      error: "você não informou os campos que devem sofrer alteração!'",
    });
  } else {
    execSQLQuery(`UPDATE prefeitos SET ${columns} WHERE PRE_ID = ${id}`, res);
  }
});

router.delete("/prefeitos/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id)))
    return res.json({
      error: "Tipo de parametro errado, deve ser um inteiro!",
    });
  let filter = " WHERE PRE_ID=" + parseInt(id);
  execSQLQuery("DELETE FROM prefeitos" + filter, res);
});

//CIDADES
router.get("/cidades", (req, res) => {
  execSQLQuery("SELECT * FROM cidades", res, true);
});

router.get("/cidades/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id)))
    return res.json({
      error: "Tipo de parametro errado, deve ser um inteiro!",
    });
  let filter = " WHERE CID_ID=" + parseInt(id);
  execSQLQuery("SELECT * FROM cidades" + filter, res, true);
});

router.post("/cidade-por-nome", (req, res) => {
  const name = req.body.nome;
  let filter = "";
  if (!name) return res.json({ error: "falta o parametro de entrada 'nome'" });
  filter = " WHERE CID_NOME LIKE '%" + name + "%'";
  execSQLQuery("SELECT * FROM cidades" + filter, res, true);
});

router.post("/cidades", (req, res) => {
  const name = req.body.nome;
  const uf = req.body.uf;
  const mayor = req.body.prefeito || null;
  const population = req.body.populacao || null;

  if (!name) return res.json({ error: "falta o parametro de entrada 'nome'" });
  if (!uf) return res.json({ error: "falta o parametro de entrada 'uf'" });

  execSQLQuery(
    `INSERT INTO cidades(CID_NOME, UF_ID, CID_POPULACAO, PRE_ID) VALUES('${name}','${uf}','${mayor}','${population}')`,
    res
  );
});

router.put("/cidades/:id", (req, res) => {
  const id = req.params.id;
  let name = req.body.nome;
  let uf = req.body.uf;
  let mayor = req.body.prefeito || null;
  let population = req.body.populacao || null;

  if (!id) return res.json({ error: "falta o parametro de entrada 'id'" });

  name = name ? `CID_NOME='${name}', ` : "";
  uf = uf ? `UF_ID=${uf}, ` : "";
  mayor = mayor ? `PRE_ID=${mayor}, ` : "";
  population = population ? `CID_POPULACAO=${population}, ` : "";

  let columns =
    name || uf || mayor || population ? name + uf + mayor + population : "";

  if (!columns) {
    return res.json({
      error: "você não informou os campos que devem sofrer alteração!'",
    });
  } else {
    execSQLQuery(
      `UPDATE cidades SET ${columns.substr(
        0,
        columns.lastIndexOf(",")
      )} WHERE CID_ID = ${id}`,
      res
    );
  }
});

router.delete("/cidades/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id)))
    return res.json({
      error: "Tipo de parametro errado, deve ser um inteiro!",
    });
  let filter = " WHERE CID_ID=" + parseInt(id);
  execSQLQuery("DELETE FROM cidades" + filter, res);
});

//tratamento de rota nao existente
// router.get("*", (req, res) => res.json({ message: "Essa rota não existe!" }));

app.use("/", router);

//inicia o servidor
app.listen(port, () => {
  console.log("Servidor rodando!!!");
});

function execSQLQuery(sqlQry, res, select = false) {
  const connection = mysql.createConnection({
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
  });

  connection.connect(function (err) {
    if (err) {
      return res.json(err);
    }
  });

  connection.query(sqlQry, function (error, results) {
    if (error) {
      connection.end();
      return res.json({ error: true, details: error });
    } else {
      connection.end();
      return (
        (!select &&
          res.json({
            id: results.insertId,
            affectedRows: results.affectedRows,
            changedRows: results.changedRows,
            error: false,
          })) ||
        res.json(results)
      );
    }
  });
}
