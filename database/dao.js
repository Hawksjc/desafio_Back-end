const pool = require("./config");

let operations = {

    list: function() {
        return pool.promise().query("select * from tarefas")
    },
    findById: function(id){
        return pool.promise().query('SELECT * FROM tarefas WHERE id = ?', [id]);
    }, 
    save: function(tarefa){}, 
    update: function(tarefa){}, 
    remove: function(id){
        return pool.promise().execute("delete from tarefas where id=?", [id])

    }, 
}

module.exports = operations;