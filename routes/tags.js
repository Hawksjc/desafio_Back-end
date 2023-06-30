var express = require('express');
var router = express.Router();
var dao = require('../database/daoTags')

router.get('/', function(req, res) {
  
  //http://localhost:3001/tags/

    dao.listTag().then(([rows]) => {
      res.json({ tags: rows });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Erro ao buscar tags' });
    });
});
  
router.post('/:id/tags', function(req, res) {
  
  //http://localhost:3001/tags/(id da tarefa)/tags/
  //{
  //  "nome": "Nova tag",
  //  "cor": "#FF0000"
  //}

    dao.saveTags(req.params.id, req.body.nome, req.body.cor).then(() => {
        res.json({ message: 'Tag adicionada à tarefa com sucesso' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao adicionar tag à tarefa' });
      });
});
  
router.delete('/:id/tags/:tagId', function(req, res) {
  
  //http://localhost:3001/tags/(id da tarefa)/tags/(id da tag)

    if (!req.params.tagId) {
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
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao remover tag' });
      });
});
  
router.put('/:id', function(req, res) {
  
  //http://localhost:3001/tags/(id da tarefa)/tags/(id da tag)
  //{
  //  "nome": "Tag atualizada",
  //  cor": "#FF0000"
  //}

   dao.updateTag(req.params.id, req.body.nome, req.body.cor)
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

    // http://localhost:3001/tags/(id da tarefa)/tags

    dao.PegarTagsDaTarefa(req.params.id).then(([rows]) => {
        res.json({ tags: rows });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar tags da tarefa' });
      });
  });
  
  router.get('/tags/:tagName', function (req, res) {
  
    //se a tag for "Nova tag 2"
    //http://localhost:3001/tags/tags/Nova%20tag%202

    dao.PegarTarefasPorNomeDaTag(req.params.tagName).then(([rows]) => {
        res.json({ tarefas: rows });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar tarefas por tag' });
      });
  });  

router.get('/search', function(req, res) {

  //se o nome da tag for "Nova tag" e "Nova tag 2" se as tags tiverem uma tarefa em comum
  //http://localhost:3001/tags/search?tags=Nova%20tag,Nova%20tag%202
  
  const tags = req.query.tags;
    
    const tagArray = tags.split(',');
  
    dao.PesquisarTarefasPorTags(tagArray).then(([rows]) => {
        res.json({ tarefas: rows });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao pesquisar tarefas por tags' });
      });
});

module.exports = router;