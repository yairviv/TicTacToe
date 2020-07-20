import axios from 'axios';
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const INIT_BOARD = 'INIT_BOARD'

export const updateBoard = (query) => dispatch => {
    let finalUrl = 'http://localhost:5000'
    return axios.put(finalUrl, query, { 'Authorization': 'Bearer Developer_Token', 'Content-Type': 'application/json' }).then(res => {
        const board = res.data;
        dispatch({ type: UPDATE_BOARD, payload: board })
    });
}
export const initBoard = (query) => dispatch => {
    let finalUrl = 'http://localhost:5000'
    return axios.post(finalUrl)
        .then(res => {
            const board = res.data;
            dispatch({ type: INIT_BOARD, payload: board })
        })
}