import { apiUrl } from "../js/App";
import axios from "axios";
import { useUserStore } from "../js/useUserStore";
import { useNavigate } from "react-router";
import { useForm } from "./useForm";

export const useSignUp = () => {
    let navigate = useNavigate();
    const { setUser } = useUserStore();
    const { setErrors, renderFieldError } = useForm();

    const signup = (email, password, username) => {
        axios
            .post(`${apiUrl}/user/register`, {
                email,
                password,
                username,
            })
            .then((response) => {
                if (response.data.user) {
                    alert("New user is registered");
                    setUser(response.data.user);
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            });
    };

    return {
        signup,
        renderFieldError,
    };
};
