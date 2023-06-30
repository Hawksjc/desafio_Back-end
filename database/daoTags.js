const pool = require("./config");

let operationsTag = {

    listTag: function() {
        return pool.promise().query('SELECT * FROM tags');
      },
    findByIdTag: function(id){
      return pool.promise().query('SELECT * FROM tags WHERE id = ?', [id])
    },
    removeTag: function(tarefaId, tagId) {
        return pool.promise().execute('DELETE FROM tarefa_tags WHERE tarefa_id = ? AND tag_id = ?', [tarefaId, tagId]);
    },
    updateTag: function(tagId, nome, cor) {
      return pool.promise().execute('UPDATE tags SET nome = ?, cor = ? WHERE id = ?', [nome, cor, tagId]);
    },
    saveTags: async function (tarefaId, nome, cor) {
        const [result] = await pool.promise().query('SELECT id FROM tags WHERE nome = ?', [nome]);
      
        if (result.length !== 0) {
          return await pool.promise().execute('INSERT INTO tarefa_tags (tarefa_id, tag_id) VALUES (?, ?)', 
            [tarefaId, result[0].id]);
        } else {
          const [tagResult] = await pool.promise().execute('INSERT INTO tags (nome, cor) VALUES (?, ?)', 
            [nome, cor]);
      
          return await pool.promise().execute('INSERT INTO tarefa_tags (tarefa_id, tag_id) VALUES (?, ?)', 
            [tarefaId,tagResult.insertId]);
        }
      },

      PegarTagsDaTarefa: function(tarefaId) {
        return pool.promise().query(
          `SELECT tags.id, tags.nome, tags.cor FROM tags
          INNER JOIN tarefa_tags ON tarefa_tags.tag_id = tags.id
          WHERE tarefa_tags.tarefa_id = ?`, [tarefaId]
        );
    },
      
    PegarTarefasPorNomeDaTag: function(tagName) {
        return pool.promise().query(
          `SELECT tarefas.* FROM tarefas
          INNER JOIN tarefa_tags ON tarefas.id = tarefa_tags.tarefa_id
          INNER JOIN tags ON tarefa_tags.tag_id = tags.id
          WHERE tags.nome = ?`, [tagName]
        );
    },
    PesquisarTarefasPorTags: function(tags) {
      const placeholders = Array(tags.length).fill('?').join(',');

    return pool.promise().query(`
    SELECT tarefas.*
    FROM tarefas
    INNER JOIN tarefa_tags ON tarefas.id = tarefa_tags.tarefa_id
    INNER JOIN tags ON tarefa_tags.tag_id = tags.id
    WHERE tags.nome IN (${placeholders})
    GROUP BY tarefas.id
    HAVING COUNT(DISTINCT tags.nome) = ?`, [...tags, tags.length]);
    }
}

module.exports = operationsTag