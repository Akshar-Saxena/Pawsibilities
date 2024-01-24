import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import verifyToken from "../constants/verifyToken";
import { MoonLoader } from "react-spinners";

export default function HomePage() {
    const navigate = useNavigate();
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const logoutHandler = () => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        check();
        window.location.reload();
    };

    const check = async () => {
        setLoading(true);
        const flag = await verifyToken(document.cookie.slice(6));
        setVerify(flag);
        setLoading(false);
    };

    useEffect(() => {
        check();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen bg-[#FFEFDE]">
                    <MoonLoader loading={true} size={120} color="#B85B2F" />
                    <img
                        className="w-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        src="/logo.png"
                        alt=""
                    />
                </div>
            ) : (
                <div>
                    <NavBar />
                    <div className="bg-[url('/bg.png')] bg-contain bg-no-repeat w-full h-[82vh]"></div>
                    <h1 className="absolute text-center top-[230px] ml-[10%] text-5xl">
                        From Stray to Stay <br />{" "}
                        <span className="text-[#FF9775]">
                            {" "}
                            Your Pet's Perfect Way
                        </span>
                    </h1>
                    {!verify ? (
                        <button
                            onClick={() => navigate("/login")}
                            className="py-2 absolute top-[360px] ml-[25%] px-4 rounded-md bg-[#FF9775]"
                        >
                            Register Now
                        </button>
                    ) : (
                        <button
                            onClick={logoutHandler}
                            className="py-2 absolute top-[360px] ml-[25%] px-4 rounded-md bg-[#FF9775]"
                        >
                            Logout
                        </button>
                    )}

                    <div className="flex flex-col justify-center items-center">
                        <h1 id="about" className="text-4xl my-6">
                            About
                        </h1>
                        <p className="w-[75%] text-justify text-lg">
                            At{" "}
                            <span className="text-[#FF9775]">
                                Pawsibilities
                            </span>
                            , we believe in the transformative power of love and
                            companionship between humans and animals. Our
                            mission is to create forever homes for every paw,
                            whisker, and tail that comes our way. We are not
                            just a pet adoption platform; we are matchmakers for
                            families and their future four-legged members.
                        </p>
                        <p className="w-[75%] mt-6 text-justify text-lg">
                            By choosing{" "}
                            <span className="text-[#FF9775]">
                                Pawsibilities
                            </span>
                            , you're not just adopting a pet; you're becoming
                            part of a community dedicated to making a positive
                            impact on the lives of animals. Together, we can
                            create countless happy tales of tails wagging,
                            whiskers twitching, and hearts overflowing with
                            love.
                        </p>
                    </div>
                    <div className="bg-[#EDAA88] py-5 mt-16 flex justify-center items-center">
                        Made by - Akshar Saxena
                    </div>
                </div>
            )}
        </div>
    );
}
