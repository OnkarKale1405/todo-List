import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post('http://localhost:8000/v1/api/users/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
