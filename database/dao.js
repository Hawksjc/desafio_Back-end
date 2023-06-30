const pool = require("./config");

let operations = {

    list: function() {
        return pool.promise().query("SELECT * FROM tarefas")
    },
    findById: function(id){
        return pool.promise().query('SELECT * FROM tarefas WHERE id = ?', [id]);
    }, 
    remove: function(id){
        return pool.promise().execute("DELETE FROM tarefas WHERE id=?", [id])
    },
    save: function(tarefa){
        if (tarefa.status !== 'Em andamento' && tarefa.status !== 'Finalizado') {
            throw new Error('Status inválido');
        }
        
        return pool.promise().execute('INSERT INTO tarefas (titulo, status, prioridade, descricao) VALUES (?, ?, ?, ?)', 
        [tarefa.titulo, tarefa.status, tarefa.prioridade, tarefa.descricao]);
    },
    update: function(tarefa){
        if (tarefa.status !== 'Em andamento' && tarefa.status !== 'Finalizado') {
            throw new Error('Status inválido');
        }

        return pool.promise().execute('UPDATE TAREFAS set titulo = ?, status = ?, prioridade = ?, descricao = ? WHERE id = ?', 
        [tarefa.titulo, tarefa.status, tarefa.prioridade, tarefa.descricao, tarefa.id]);
    },
    saveUsuario: async function(usuario){

        return pool.promise().execute('INSERT INTO usuario (nome, login, senha) values (?, ?, ?)', [usuario.nome, usuario.login, usuario.senha])
    },
    
}

module.exports = operations;