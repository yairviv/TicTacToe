const express = require('express');
const app = express();
const port = 5000;
const boardRepository = require('./DataAccess/boardRepository');
const bodyParser = require('body-parser')
let bord = { line1: ['', '', ''], line2: ['', '', ''], line3: ['', '', ''] };

const checkWinner = () => {
    if (bord.line1[0] != '' && bord.line1[0] == bord.line1[1] && bord.line1[1] == bord.line1[2] ||
        bord.line2[0] != '' && bord.line2[0] == bord.line2[1] && bord.line2[1] == bord.line2[2] ||
        bord.line2[0] != '' && bord.line2[0] == bord.line2[1] && bord.line2[1] == bord.line2[2] ||
        bord.line1[0] != '' && bord.line1[0] == bord.line2[1] && bord.line2[1] == bord.line3[2] ||
        bord.line1[2] != '' && bord.line1[2] == bord.line2[1] && bord.line2[1] == bord.line3[0] ||
        bord.line1[0] != '' && bord.line1[0] == bord.line2[0] && bord.line2[0] == bord.line3[0] ||
        bord.line1[1] != '' && bord.line1[1] == bord.line2[1] && bord.line2[1] == bord.line3[1] ||
        bord.line1[2] != '' && bord.line1[2] == bord.line2[2] && bord.line2[2] == bord.line3[2]) {
        return true;
    } else {
        return false;
    }
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.put('/', async (req, res) => {
    let line = req.body.line;
    let index = req.body.index;
    let value = req.body.input;
    bord[`line${line}`][index] = value;
    bord.id = req.body.id;
    bord = await boardRepository.updateBoard(bord);
    if (checkWinner()) {
        return res.send(JSON.stringify({ bord: bord, winner: value }));
    }
    return res.send(JSON.stringify(bord));
})

app.post('/', async (req, res) => {
    let obj = await boardRepository.initBoard(bord);
    return res.send(JSON.stringify(obj));
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))