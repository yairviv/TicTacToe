var mongoose = require('mongoose');

class boardRepository {
    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017/XO', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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
        await Board.findByIdAndUpdate(board._id, board)
        return board;
    }

    /*

        ser(userName) {
                var User = mongoose.model('user', this.UserSchema);
    var newUser = new User({ userName: userName });
        dOne({ 'userName': userName }, function (err, fetchedUser) {
            if (err) return handleError(err);
            console.log(fetchedUser)
            if (fetchedUser == undefined) {
                newUser.save(function (err, user) {
                    if (err) return console.error(err);
                    console.debug(user.username)
                    eturn user.userName;
 
 
        
  
                    */
                
}

module.exports = new boardRepository();




