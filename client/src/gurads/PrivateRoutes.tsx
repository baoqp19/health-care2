import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuthStore((state) => state);
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    return element;

}

export default PrivateRoute 