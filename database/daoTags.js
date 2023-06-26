const pool = require("./config");

let operationsTag = {

    listTags: function() {
        return pool.promise().query('SELECT * FROM tags');
      },
    removeTag: function(tagId) {
        return pool.promise().execute('DELETE FROM tags WHERE id = ?', [tagId]);
    },
    updateTag: function(tagId, nome, cor) {
        return pool.promise().execute('UPDATE tags SET nome = ?, cor = ? WHERE id = ?', [nome, cor, tagId]);
    },
    saveTags: async function (tarefaId, nome, cor) {
        const [result] = await pool.promise().query('SELECT id FROM tags WHERE nome = ?', [nome]);
      
        if (result.length > 0) {
          return await pool.promise().execute('INSERT INTO tarefa_tags (tarefa_id, tag_id) VALUES (?, ?)', 
            [tarefaId, result[0].id,]);
        } else {
          const [tagResult] = await pool.promise().execute('INSERT INTO tags (nome, cor) VALUES (?, ?)', 
            [nome, cor]);
      
          return await pool.promise().execute('INSERT INTO tarefa_tags (tarefa_id, tag_id) VALUES (?, ?)', 
            [tarefaId,tagResult.insertId,]);
        }
      }

}

module.exports = operationsTag