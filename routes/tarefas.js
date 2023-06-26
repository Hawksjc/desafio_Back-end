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

router.delete('/:id', function(req, res) {

  dao.findById(req.params.id).then(([rows]) => {
    if (rows.length === 0) {
      res.json({ message: 'Tarefa não encontrada' });
    } else {
      dao.remove(req.params.id).then(([result]) => {
        console.log(result);
        if (result.affectedRows > 0)
          res.json({ message: 'Tarefa excluída com sucesso' });
        else
          res.json({ message: 'Falha ao excluir tarefa' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao excluir tarefa' });
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  });
});

module.exports = router;
