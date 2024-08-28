const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})  // http://localhost:8080/api/alunos

let alunos = [
    {id: 1, nome: 'Lucas'},
    {id: 2, nome: 'Matheus'},
]

app.get('/api/alunos', (req, res) => {
    res.json(alunos);
});

app.get('/api/alunos/getByName/:nome', (req, res) => {
    const { nome } = req.params;
    const index = alunos.findIndex(a => a.nome === nome);

    if (index > -1) {
        res.json(alunos[index]);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado'});
    }
});

app.post('/api/alunos', (req, res) => {
    const novoAluno = { id: alunos.length + 1, ...req.body };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

app.put('/api/alunos/:id', (req, res) => {
    const { id } = req.params;
    console.log('--- id', id);
    const alunoIndex = alunos.findIndex(a => a.id === Number(id));
    console.log('--- aluno index', alunoIndex);
    if (alunoIndex > -1) {
        alunos[alunoIndex] = { id: Number(id), ...req.body };
        res.json(alunos[alunoIndex]);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado'});
    }
});

app.delete('/api/alunos/:id', (req, res) => { 
    const { id } = req.params;
    const alunoIndex = alunos.findIndex(a => a.id === Number(id));
    if (alunoIndex > -1) {
        alunos.splice(alunoIndex, 1); //O método .splice() em JavaScript é usado para alterar o conteúdo de um array, removendo, substituindo ou adicionando elementos.
        res.json({ message: 'Aluno removido com sucesso'});
    } else {
        res.status(404).json({ message: 'Aluno não encontrado'});
    }
}
)
