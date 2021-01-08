const initialState = {
    province: [],
    city: []
}

const locations = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PROVINCE':
            return {
                ...state
            }
        case 'GET_PROVINCE_SUCCESS':
            return{
                ...state,
                province: action.payload,
            }
        case 'GET_PROVINCE_FAILED':
            return {
                ...state
            }
        case 'GET_CITY':
            return {
                ...state
            }
        case 'GET_CITY_SUCCESS':
            return{
                ...state,
                city: action.payload,
            }
        case 'GET_CITY_FAILED':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default locations;