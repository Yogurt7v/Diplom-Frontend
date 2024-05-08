import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

    const user = useSelector(state => state.user);
    if (!user.id) {
        return <Navigate to="/" />;
    }

    return <div>{children}</div>
}