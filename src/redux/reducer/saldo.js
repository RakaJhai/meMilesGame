const initialState = {
    data: null
}

const saldo = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_SALDO':
            return {
                ...state
            }
        case 'ADD_SALDO_SUCCESS':
            return {
                ...state,
                data: action.payload
            }
        case 'ADD_SALDO_FAILED':
            return {
                ...state
            }
        default:
            return state
    }
}

export default saldo;