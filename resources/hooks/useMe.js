import { useUserStore } from "../js/useUserStore";
import { apiUrl } from "../js/App";
import { useEffect } from "react";

export const useMe = () => {
    const { setUser } = useUserStore();

    useEffect(() => {
        axios.post(`${apiUrl}/user/me`).then((response) => {
            setUser(response.data.user);
        });
    }, []);
};
