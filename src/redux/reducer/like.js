const initialState = {
    addLike: [],
    getLike: []
}

const like = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_LIKE':
            return {
                ...state
            }
        case 'ADD_LIKE_SUCCESS':
            console.log('Reducer like', action.payload)
            return {
                ...state,
                addLike: action.payload
            }
        case 'ADD_LIKE_FAILED':
            return {
                ...state
            }
        case 'GET_LIKE':
            return {
                ...state
            }
        case 'GET_LIKE_SUCCESS':
            console.log('Reducer get like', action.payload)
            return {
                ...state,
                getLike: action.payload
            }
        case 'GET_LIKE_FAILED':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default like;