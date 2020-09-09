export const tokenConfig = () => {
    return {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        }
    }
}