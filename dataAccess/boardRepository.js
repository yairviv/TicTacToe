var mongoose = require('mongoose');

class boardRepository {
    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017/XO', { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function () {
            console.log.bind(console, 'DB connected')
        });
        this.boardSchema = new mongoose.Schema({
            line1: [],
            line2: [],
            line3: [],
        });
    }

    async initBoard(board) {
        var Board = mongoose.model('boards', this.boardSchema);
        var newBoard = new Board({ line1: board.line1, line2: board.line2, line3: board.line3 });
        return await Board.create(newBoard);
    }



    async updateBoard(board) {
        var Board = mongoose.model('boards', this.boardSchema);
        let dbResult = await Board.find({ _id: board._id });
        let dbObj = dbResult[0];
        dbObj.line1 = board.line1;
        dbObj.line2 = board.line2;
        dbObj.line3 = board.line3;
        await Board.updateOne(dbObj);
        return dbObj;
    }

    /*
 
    async inserUser(userName) {
        var User = mongoose.model('user', this.UserSchema);
    var newUser = new User({ userName: userName });
        .findOne({ 'userName': userName }, function (err, fetchedUser) {
            if (err) return handleError(err);
            console.log(fetchedUser)
            if (fetchedUser == undefined) {
newUser.save(function (err, user) {
if (err) return console.error(err);
console.debug(user.username)
return user.userName;
 
 
        

*/

}

module.exports = new boardRepository();




