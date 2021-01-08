import axios from 'axios'

const baseUrl = 'http://128.199.74.118/api/v2/'

export function apiLogin(dataLogin){
    return axios({
        method: 'POST',
        url: baseUrl +'login',
        data: dataLogin,
    })
}

export function apiProvince(){
    return axios({
        method: 'GET',
        url: baseUrl + 'province/get'
    })
}
export function apiCity(){
    return axios({
        method: 'GET',
        url: baseUrl + 'city/get'
    })
}

export function apiGameList(){
    return axios({
        method: 'GET',
        url: 'http://128.199.74.118/games/api/getgames.php'
    })
}

export function apiScoresList(dataScore){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/gethighscore.php',
        data: dataScore,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/** START API VENDOR */

export function apiAddVendor(dataVendor){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/addvendor.php',
        data: dataVendor
    })
}

export function apiGetVendor(dataVendor){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/getvendor.php',
        data: dataVendor
    })
}
/** END API VENDOR */

/** START API COMMENT */
export function apiAddComment(dataComment){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/addcommentgames.php',
        data: dataComment
    })
} 

export function apiGetComment(idGames){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/getcommentgames.php?gamesid=' + idGames,
    })
}
/** END API COMMENT */

export function apiGetKategori(){
    return axios({
        method: 'GET',
        url: 'http://128.199.74.118/api/v2/category?offset=0&limit=10',
    })
}

export function apiCommentDetails(dataComment){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/getcommentdetail.php',
        data: dataComment
    })
}

export function apiGetDurasi(){
    return axios({
        method: 'GET',
        url: 'http://128.199.74.118/games/api/getduration.php',
    })
}

export function apiAddIklan(dataIklan){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/addiklan.php',
        data: dataIklan
    })
}

export function apiAddTopUp(dataTopUp){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/addtopup.php',
        data: dataTopUp
    })
}

export function apiLike(dataLike){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/addlikegames.php',
        data: dataLike
    })
}

export function apiGetLike(dataGet){
    return axios({
        method: 'POST',
        url: 'http://128.199.74.118/games/api/getlike.php',
        data: dataGet
    })
}

export function apiGetCategoryVendor(){
    axios({
        method: 'GET',
        url: 'http://128.199.74.118/games/api/getcategoryvendor.php'
    })
}