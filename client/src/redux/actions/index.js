export const UPDATE_BOARD = 'UPDATE_BOARD'
export const INIT_BOARD = 'INIT_BOARD'

export const updateBoard = (query) => dispatch => {
    let finalUrl = 'http://localhost:5000'
    if (query.line !== undefined) {
        finalUrl = finalUrl + `?line=${query.line}`;
    }
    if (query.index !== undefined) {
        finalUrl = finalUrl + `&index=${query.index}`;
    }
    if (query.input !== undefined) {
        finalUrl = finalUrl + `&input=${query.input}`;
    }
    if (query._id !== undefined) {
        finalUrl = finalUrl + `&_id=${query._id}`;
    }
    return fetch(finalUrl)
        .then(res => res.json())
        .then(board => dispatch({ type: UPDATE_BOARD, payload: board }))
}
export const initBoard = (query) => dispatch => {
    let finalUrl = 'http://localhost:5000'
    return fetch(finalUrl)
        .then(res => res.json())
        .then(board => dispatch({ type: INIT_BOARD, payload: board }))
}