const initialState = {
    username: null,
    isLoggedIn: false,
    isLoading: false,
    failed:{},
    dataUser: {}
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                isLoading: true,
            }
        case 'LOGIN_SUCCESS':
            console.log('reducer succes', action.payload)
            return {
                ...state,
                dataUser: action.payload,
                isLoggedIn: true,
                isLoading: false,
            }
        case 'LOGIN_FAILED':
            console.log('Reduce failed', action.payload)
            return {
                ...state,
                failed: action.payload,
                isLoggedIn: false,
                isLoading: false,
            }
        case 'LOGOUT':
            return{
                ...state,
                username: null,
                isLoggedIn: false,
            }
        default:
            return state;
    }
}

export default auth;