var express = require('express');
var router = express.Router();
var dao = require('../database/daoTags')

router.get('/', function(req, res) {
    dao.listTags().then(([rows]) => {
      res.json({ tags: rows });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao buscar tags' });
    });
});
  
router.post('/:id/tags', function(req, res) {
  
    dao.saveTags(req.params.id, req.body.nome, req.body.cor).then(() => {
        res.json({ message: 'Tag adicionada à tarefa com sucesso' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao adicionar tag à tarefa' });
      });
});
  
router.delete('/:id/tags/:tagId', function(req, res) {
  
    if (!req.params) {
      res.status(400).json({ error: 'Parâmetros inválidos' });
      return;
    }
  
    dao.removeTag(req.params.id, req.params.tagId)
      .then(([result]) => {
        console.log(result);
        if (result.affectedRows > 0)
          res.json({ message: 'Tag removida com sucesso' });
        else
          res.json({ message: 'Falha ao remover tag' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao remover tag' });
      });
});
  
router.put('/:id/tags/:tagId', function(req, res) {
  
    dao.updateTag(req.params.id, req.params.tagId, req.body.nome, req.body.cor)
      .then(([result]) => {
        console.log(result);
        if (result.affectedRows > 0)
          res.json({ message: 'Tag atualizada com sucesso' });
        else
          res.json({ message: 'Falha ao atualizar tag' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao atualizar tag' });
      });
});

  router.get('/:id/tags', function(req, res) {
    const { id } = req.params;
  
    dao.PegarTagsDaTarefa(id)
      .then(([rows]) => {
        res.json({ tags: rows });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar tags da tarefa' });
      });
  });
  
  router.get('/tags/:tagName', function (req, res) {
  
    dao.PegarTarefasPorNomeTag(req.params.tagName)
      .then(([rows]) => {
        res.json({ tarefas: rows });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar tarefas por tag' });
      });
  });

module.exports = router;