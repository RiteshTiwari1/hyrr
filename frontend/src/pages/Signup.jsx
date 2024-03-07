import { useState, useEffect } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PasswordInputBox } from "../components/PasswordInputBox";

export const Signup = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                email,
                password,
                confirmPassword
            });
            // console.log(response);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing up:", error);
            // Handle signup error if needed
        }
    };

    return show && (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        placeholder="Ritesh Tiwari"
                        label={"User Name"}
                    />
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
                        placeholder="********"
                        label={"Password"}
                    />
                    <PasswordInputBox
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        placeholder="********"
                        label={"Confirm Password"}
                    />
                    <div className="pt-4">
                        <Button onClick={handleSignUp} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/"} />
                </div>
            </div>
        </div>
    );
};
