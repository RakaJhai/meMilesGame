const initialState = {
    list: []
}

const gameList = (state = initialState, action) => {
    switch(action.type){
        case 'GET_GML':
            return {
                ...state
            }
        case 'GET_GML_SUCCESS':
            return{
                // ...state,
                list: action.payload,
            }
        case 'GET_GML_FAILED':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default gameList;