var express = require('express');
var router = express.Router();
var dao = require('../database/dao')

router.get('/:id?', function(req, res) { 
  
  //http://localhost:3001/tarefas/(id) para filtrar
  //ou 
  //http://localhost:3001/tarefas/ geral
  
  if (req.params.id) {
    dao.findById(req.params.id)
      .then(([rows]) => {
        if (rows.length === 0) {
          res.status(404).json({ error: 'Tarefa não encontrada' });
        } else {
          res.json({ tarefa: rows[0] });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar tarefa por ID' });
      });
  } else {
    dao.list()
      .then(([rows]) => {
        res.json({ tarefas: rows });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
      });
  }
});

router.delete('/:id', function(req, res) { 
  
  //http://localhost:3001/tarefas/(id)

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

router.post('/', function(req, res) { 
  
  //http://localhost:3001/tarefas 
  //{
  //  "titulo": "Adicionar titulo",
  //  "status": "Em andamento",
  //  "prioridade": "1",
  //  "descricao": "Adicionar descrição"
  //}

  dao.save(req.body).then(([result]) => {
    console.log(result);
    if (result.affectedRows > 0)
      res.json({ message: 'Tarefa salva com sucesso' });
    else
      res.json({ message: 'Falha ao salvar tarefa' });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Erro ao salvar tarefa' });
  });
});

router.put('/:id', function(req, res) { 
  
  //http://localhost:3001/tarefas/(id)
  //{
  //  "titulo": "Atualizando titulo",
  //  "status": "Finalizado",
  //  "prioridade": "10",
  //  "descricao": "Atualizando descrição"
  //}

  dao.findById(req.params.id).then(([rows]) => {
    if (rows.length === 0) {
      res.json({ message: 'Não foi possível achar a tarefa.' });
    } else {
      dao.update(req.body.id).then(([result]) => {
        console.log(result);
        if (result.affectedRows > 0)
          res.json({ message: 'Sucesso! Tarefa foi atualizada' });
        else
          res.json({ message: 'Falha ao atualizar tarefa' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  });
});

module.exports = router;