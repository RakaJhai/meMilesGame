const initialState = {
    data: null
}

const iklan = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_IKLAN':
            return {
                ...state
            }
        case 'ADD_IKLAN_SUCCESS':
            return {
                ...state,
                data: action.payload
            }
        case 'ADD_IKLAN_FAILED':
            return {
                ...state
            }
        default:
            return state
    }
}

export default iklan;