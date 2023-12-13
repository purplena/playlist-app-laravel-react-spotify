import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUserStore } from "../js/useUserStore";
import { apiUrl } from "../js/App";

export const useLogin = () => {
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const { setUser } = useUserStore();

    const login = async (email, password) => {
        // make request first to sanctum/csrf-cookie endpoint
        //to initialize CSRF protection for the application
        axios.get("/sanctum/csrf-cookie").then(() => {
            const payload = {
                email,
                password,
            };
            axios
                .post(`${apiUrl}/user/login`, payload, {
                    headers: { Accept: "application/json" },
                })
                .then((response) => {
                    console.log(response.data.user);
                    if (response.data.user) {
                        setMessage(null);
                        setUser(response.data.user);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response) {
                        if (!error.response.data.status) {
                            setMessage("Email et/ou mot de passe incorrect(s)");
                        }
                    }
                });
        });
    };

    return {
        message,
        login,
    };
};
