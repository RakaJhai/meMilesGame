
const initialState = []

const scoreList = (state = initialState, action) => {
    switch(action.type){
        case 'GET_SCORELIST':
            return [
                ...state
            ]
        case 'GET_SCORELIST_SUCCESS':
            // console.log('Score list reducer', action.payload)
            return[
                // ...state,
                ...action.payload
            ]
        case 'GET_SCORELIST_FAILED':
            return[
                ...state
            ]
        default:
            return state
    }
}

export default scoreList;