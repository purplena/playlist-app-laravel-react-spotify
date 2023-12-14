import { useNavigate } from "react-router";
import { useUserStore } from "../js/useUserStore";
import { apiUrl } from "../js/App";
import { useForm } from "./useForm";

export const useLogin = () => {
    let navigate = useNavigate();
    const { setUser } = useUserStore();
    const { setErrors, renderFieldError } = useForm();

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
                        setUser(response.data.user);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    if (!error.response?.data?.status) {
                        setErrors({
                            loginError: [error.response.data.message],
                        });
                    }
                    if (
                        error.response.data.email ||
                        error.response.data.password
                    ) {
                        setErrors(error.response.data);
                    }
                });
        });
    };

    return {
        login,
        renderFieldError,
    };
};
