const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/api/:type', (request, response, next) => {
    db.readTable(request.params.type)
    .then( data => response.send(data))
    .catch(next);
});

app.delete('/api/:type/:id', (request, response, next) => {
    db.removeFromTable(request.params.type, request.params.id)
    .then(() => response.sendStatus(204))
    .catch(next);
});

//This may be wrong, it's just a placeholder for now.
app.put('/api/:type/:id', (request, response, next) => {
    db.updateItem(request.params.type, request.params.id)
    .then( data => response.send(data))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
.then(()=>{
    app.listen(port, () => {
        console.log('listening on port', port)
    });
});