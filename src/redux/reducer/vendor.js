const initialState = {
    dtAddVendor: [],
    dtGetVendor: []
}

const vendor = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_VENDOR':
            return{
                ...state
            }
        case 'ADD_VENDOR_SUCCESS':
            return{
                ...state,
                dtAddVendor: action.payload
            }
        case 'ADD_VENDOR_FAILED':
            return{
                ...state
            }
        case 'GET_VENDOR':
            return{
                ...state
            }
        case 'GET_VENDOR_SUCCESS':
            return{
                ...state,
                dtGetVendor: action.payload
            }
        case 'GET_VENDOR_FAILED':
            return{
                ...state
            }
        default:
            return state
    }
}

export default vendor;