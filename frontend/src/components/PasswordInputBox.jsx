import React, { useState } from "react";

export const PasswordInputBox = ({ onChange, placeholder, label }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-2">
            <label className="text-sm text-left font-semibold block">{label}</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                {(label === "Password" || label === "Confirm Password") && !!onChange && (
                    <button
                        className="absolute top-2 right-2 text-sm"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </div>
    );
};
