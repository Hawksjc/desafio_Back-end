var express = require('express');
var router = express.Router();
var dao = require('../database/dao')

router.get('/', function(req, res, next) {
    dao.list().then(([ rows ]) => {
        res.json({ tarefas: rows });
      }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
      })
});

module.exports = router;
