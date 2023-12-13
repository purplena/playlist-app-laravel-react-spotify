import { useNavigate } from "react-router";
import { apiUrl } from "../js/App";
import { useUserStore } from "../js/useUserStore";

export const useLogout = () => {
    const { user, setUser } = useUserStore();
    let navigate = useNavigate();

    const handleLogout = () => {
        axios
            .post(`${apiUrl}/user/logout`)
            .then(() => {
                setUser(null);
                console.log(user);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return { user, handleLogout };
};
