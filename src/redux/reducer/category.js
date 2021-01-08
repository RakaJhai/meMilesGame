const initialState = {
    data: []
}

const category = (state = initialState, action) => {
    switch(action.type){
        case 'GET_CATEGORY':
            return {
                ...state
            }
        case 'GET_CATEGORY_SUCCESS':
            // console.log('Reducer category', action.payload)
            return {
                ...state,
                data: action.payload
            }
        case 'GET_CATEGORY_FAILED':
            return {
                ...state
            }   
        default:
            return state;
    }
}

export default category;