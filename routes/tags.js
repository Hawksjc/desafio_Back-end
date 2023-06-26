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
    const { id } = req.params;
    const { nome, cor } = req.body;
  
    dao.saveTags(id, nome, cor).then(() => {
        res.json({ message: 'Tag adicionada à tarefa com sucesso' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao adicionar tag à tarefa' });
      });
});
  
router.delete('/:id/tags/:tagId', function(req, res) {
    const { id, tagId } = req.params;
  
    dao.removeTag(tagId)
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
    const { id, tagId } = req.params;
    const { nome, cor } = req.body;
  
    dao.updateTag(tagId, nome, cor)
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

module.exports = router;