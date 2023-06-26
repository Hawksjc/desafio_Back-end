const pool = require("./config");

let operations = {

    list: function() {
        return pool.promise().query("select * from tarefas")
    },
    findById: function(id){}, 
    save: function(){}, 
    update: function(){}, 
    remove: function(id){}, 
}

module.exports = operations;