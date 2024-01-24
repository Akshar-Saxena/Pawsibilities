import React, { useEffect, useState } from "react";
import { db } from "../constants/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    let flag = false;
    let token;

    const clearAllCookies = () => {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie =
                name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    };

    useEffect(() => {
        clearAllCookies();
    });

    const loginHandler = async () => {
        const users = await getDocs(collection(db, "users"));
        users.forEach((element) => {
            if (
                element.data().email == email &&
                element.data().password == password
            ) {
                flag = true;
                token = element.data().id;
                return null;
            }
        });
        if (flag) {
            document.cookie = `token="${token}"`;
            navigate("/");
        } else {
            toast.error("Invalid username or password");
        }
    };

    const verify = () => {
        if (email == "" || password == "") {
            toast.error("Fill each field");
            return null;
        }
        loginHandler();
    };

    return (
        <div className="bg-[url('/login.png')] w-full h-screen bg-cover">
            <Toaster />
            <div className="flex w-full h-screen justify-center items-center">
                <img className="w-1/3 relative" src="/loginCard.png" alt="" />
                <div className="absolute flex flex-col justify-center items-center top-[250px]">
                    <h1 className="text-5xl mb-10">Login</h1>
                    <input
                        className="my-3 py-3 px-8 focus:outline-none focus:shadow-sm focus:shadow-black w-[300px] rounded-full bg-[#FFEFDE]"
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="my-3 py-3 px-8 focus:outline-none focus:shadow-sm focus:shadow-black w-[300px] rounded-full bg-[#FFEFDE]"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={verify}
                        className="py-2 px-7 rounded-full my-7 shadow-md shadow-gray-700 bg-[#FF9775]"
                    >
                        Login
                    </button>
                    <span className="text-gray-500">
                        Don't have an account?{" "}
                        <a className="text-[#FFEFDE]" href="/signup">
                            Signup
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
