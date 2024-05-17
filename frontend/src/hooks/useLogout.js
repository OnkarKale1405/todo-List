import { useAuth } from "../context/AuthProvider";
import axios from "../api/axios";

const useLogout = () => {
    const { auth, setAuth } = useAuth();
    const userId = auth._id;

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post('http://localhost:8000/v1/api/users/logout', {
                userId
            }, {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
