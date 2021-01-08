const initialState = {
    dataAdd: {},
    dataGetComm: [],
    detailComments: []
}

const gamesComment = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_COMMENT_GAMES':
            return{
                ...state,
            }
        case 'ADD_COMMENT_GAMES_SUCCESS':
            return{
                ...state,
                dataAdd: action.payload
            }
        case 'ADD_COMMENT_GAMES_FAILED':
            return{
                ...state,
            }
        case 'GET_COMMENT_GAMES':
            return{
                ...state,
            }
        case 'GET_COMMENT_GAMES_SUCCESS':
            // console.log('reducer get commer', action.payload)
            return{
                ...state,
                dataGetComm: action.payload
            }
        case 'GET_COMMENT_GAMES_FAILED':
            return{
                ...state,
            }
        case 'DETAILS_COMMENT':
            return{
                ...state,
            }
        case 'DETAILS_COMMENT_SUCCESS':
            // console.log('reducer DETAILS_COMMENT_SUCCESS', action.payload)
            return{
                ...state,
                detailComments: action.payload
            }
        case 'DETAILS_COMMENT_FAILED':
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default gamesComment;

// yield all(
//     resContentt.data.interests.map((item) => {
//       return put(getContent(item));
//     }),
//   );
// Muhammad Agiel Nugraha
// 22.55
// array_commnet [{
// gamesId:
// comments:
// }]
// Muhammad Agiel Nugraha
// 22.57
// array_commnet [{
// gamesId:1
// comments:a
// },
// {
// gamesId: 2,
// comments: b
// }]