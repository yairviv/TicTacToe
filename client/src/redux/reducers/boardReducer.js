import { UPDATE_BOARD } from '../actions/index'
import initialState from './initialState'
function manageBoard(board = initialState.board, action) {
    switch (action.type) {
        case UPDATE_BOARD:
            board = action.payload;
            return board;
        default: return board
    }
}
export default manageBoard;