import { jwtDecode } from 'jwt-decode';

export const judgeJwtDecode =()=>{
    if(localStorage.getItem('judgetoken')){
        const decodedToken = jwtDecode(localStorage.getItem('judgetoken'));
        return decodedToken
    }
    else{
        console.log('Token not present');
        return null;    }
}

export const SellerjwtDecodeFunction =()=>{
    const decodedToken = jwtDecode(localStorage.getItem('sellertoken'));
    return decodedToken
}

export const AdminjwtDecodeFunction =()=>{
    const decodedToken = jwtDecode(localStorage.getItem('admintoken'));
    return decodedToken
}
export const StudentjwtDecodeFunction =()=>{
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    return decodedToken;
}