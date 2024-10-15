//Kiểm tra email
export const isValiEmail = (stringEmail) =>{
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(stringEmail));
}
//Kiểm tra password
export const isValiEPassword = (stringPassword) =>{return stringPassword.length >=6} 

//Kiểm tra password trùng
export const isValiEPasswordUsed = (stringPassword1, stringPassword2) => {
    return stringPassword1 == stringPassword2;
}

