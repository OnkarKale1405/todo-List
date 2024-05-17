import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";

const RefreshUrl = "http://localhost:8000/v1/api/users/refresh-token"
const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(RefreshUrl,
            { refreshToken: auth.refreshToken },
            { withCredentials: true }
        );
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accesstoken);
            return {
                ...prev,
                accesstoken: response.data.accessToken
            }
        })
        return response.data.accesstoken;
    }

    return refresh;
}

export default useRefreshToken;
