const express = require('express');
const app = express();
const port = 5000;
const boardRepository = require('./DataAccess/boardRepository');
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

app.get('/', async (req, res) => {
    if (!req.query.line) {
        let obj = await boardRepository.initBoard(bord);
        return res.send(JSON.stringify(obj));
    }
    let line = req.query.line;
    let index = req.query.index;
    let value = req.query.input;
    bord[`line${line}`][index] = value;
    bord._id = req.query._id;
    bord = await boardRepository.updateBoard(bord);
    if (checkWinner()) {
        return res.send(JSON.stringify({ bord: bord, winner: value }));
    }
    return res.send(JSON.stringify(bord));
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))