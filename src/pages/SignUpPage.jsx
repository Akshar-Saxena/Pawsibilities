import React, { useEffect, useState } from "react";
import { db } from "../constants/firebase.js";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    let flag = true;

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

    const signupHandler = async () => {
        if (username == "" || password == "" || email == "") {
            toast.error("Fill each field");
            return null;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email");
            return null;
        }
        const users = await getDocs(collection(db, "users"));
        users.forEach((element) => {
            if (element.data().email == email) {
                flag = false;
                toast.error("User with this email already exists");
                return null;
            }
        });
        let token = uuidv4();
        if (flag) {
            await addDoc(collection(db, "users"), {
                id: token,
                email: email,
                username: username,
                password: password,
            })
                .then(() => {
                    toast.success("Account Created. Redirecting to Home");
                })
                .catch(() => {
                    toast.error("Error Occured");
                });
            document.cookie = `token=${token}`;
            navigate("/");
        }
    };

    return (
        <div className="bg-[url('/login.png')] w-full h-screen bg-cover">
            <Toaster />
            <div className="flex w-full h-screen justify-center items-center">
                <img className="w-1/3 relative" src="/loginCard.png" alt="" />
                <div className="absolute flex flex-col justify-center items-center top-[220px]">
                    <h1 className="text-5xl mb-5">Sign Up</h1>
                    <input
                        className="my-3 py-3 px-8 focus:outline-none focus:shadow-sm focus:shadow-black w-[300px] rounded-full bg-[#FFEFDE]"
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        onClick={signupHandler}
                        className="py-2 px-7 rounded-full my-4 shadow-md shadow-gray-700 bg-[#FF9775]"
                    >
                        Sign Up
                    </button>
                    <span className="text-gray-500">
                        Already have an account?{" "}
                        <a className="text-[#FFEFDE]" href="/login">
                            Login
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
}
