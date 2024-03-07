import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PasswordInputBox } from "../components/PasswordInputBox";
import RedWarning from "../components/RedWarning"; 
import GreenSuccess from "../components/GreenSuccess"; 

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // If token exists, redirect to the dashboard
        if (token) {
          navigate('/dashboard'); // Replace with the actual path to your dashboard
        } else {
          // Token doesn't exist, set show to true
          setShow(true);
        }
    }, [navigate]);

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                email,
                password
            });
            setSuccessMessage("User signed in successfully!");

            localStorage.setItem("token", response.data.token);

            // Redirect to the dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in:", error);

            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Error while signing in");
            }
        } finally {
            // Display messages for 3 seconds
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 3000);
        }
    };

    return show && (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="ritesh@gmail.com"
                        label={"Email"}
                    />
                    <PasswordInputBox
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="123456"
                        label={"Password"}
                    />

                    {errorMessage && <RedWarning message={errorMessage} />}
                    {successMessage && <GreenSuccess message={successMessage} />}
                    <div className="pt-4">
                        <Button onClick={handleSignIn} label={"Sign in"} />
                    </div>
                    
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                    
                </div>
            </div>
        </div>
    );
};
