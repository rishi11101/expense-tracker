// export const useGetUserInfo = () => {

//     //extracting items from local storage (parse is opposite to stringify)
//     const { name = '' , profilePhoto = '', userID ='', isAuth = false } = JSON.parse(localStorage.getItem("auth"));

//     return { name, profilePhoto, userID, isAuth };
// }

export const useGetUserInfo = () => {

    const authInfo = JSON.parse(localStorage.getItem("auth")) || {};
    const { name = '', profilePhoto = '', userID = '', isAuth = false } = authInfo;


    return { name, profilePhoto, userID, isAuth };
}