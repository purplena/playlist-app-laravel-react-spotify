import { useNavigate } from "react-router";
import { apiUrl } from "../js/App";
import { useUserStore } from "../js/useUserStore";

export const useLogout = () => {
    const { user, setUser } = useUserStore();


    const handleLogout = async () => {
        return axios
            .post(`${apiUrl}/user/logout`)
            .then((response) => {
                setUser(null);
                return response;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return { user, logout: handleLogout };
};
