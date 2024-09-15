import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const WithAuth = (WrappedComponent) => {
    const AuthComopent = (props) => {
        const router = useNavigate();

        const isAuthnticated = () => {
            if(localStorage.getItem("token")){
                return true;
            }
            return false;
        }

        useEffect(() => {

            if(!isAuthnticated()){
                router("/auth")
            }

        }, [])

        return <WrappedComponent {...props} />
    }

    return AuthComopent;


}
export default WithAuth;