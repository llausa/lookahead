import LocalApi from "./api";

export default setAuthToken = (token) => {
    sessionStorage.setItem("token", token);
    
    return {
        type: "AUTH_TOKEN",
        payload: token
    };
}