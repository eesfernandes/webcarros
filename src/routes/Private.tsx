import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivideProps{
    children: ReactNode;
}

export function Private({ children }: PrivideProps): any {

    const { signed, loadingAuth } = useContext(AuthContext);

    if(loadingAuth){
        return <div></div>
    }

    if(!signed){
        return <Navigate to="/login" />
    }

    return children;

}