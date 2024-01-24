import React, { useEffect, useState } from "react";
import verifyToken from "../constants/verifyToken";
import { MoonLoader } from "react-spinners";
import { redirect, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import NavBar from "../components/NavBar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, store } from "../constants/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

export default function UploadPage() {
    const [loading, setLoading] = useState(true);
    const [verify, setVerify] = useState(false);
    const [add, setAdd] = useState("");
    const [animal, setAnimal] = useState("Dog");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    const getCurrentDateTime = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const formattedDate = `${month}-${day}-${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `${formattedDate} ${formattedTime}`;
    };

    const uploadHandler = async () => {
        const users = await getDocs(collection(db, "users"));
        let user;
        let date = getCurrentDateTime();
        users.forEach((element) => {
            if (JSON.stringify(element.data().id) == document.cookie.slice(6)) {
                user = element.data().username;
            }
        });
        setLoading(true);
        let link;
        const image = ref(store, `${v4()}`);
        uploadBytes(image, img).then((data) => {
            getDownloadURL(data.ref).then(async (val) => {
                link = val;
                await addDoc(collection(db, "animals"), {
                    user: user,
                    add: add,
                    animal: animal,
                    img: link,
                    date: date,
                });
                setAdd("");
                setImg("");
                setLoading(false);
                toast.success("Animal added successfully");
            });
        });
    };

    const validate = () => {
        if (add == "" || img == "") {
            return null;
        }
        uploadHandler();
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
            <Toaster />
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
                    {verify ? (
                        <div className="bg-[#FFEFDE] w-full h-screen">
                            <NavBar />
                            <div className="w-full pt-[18vh] flex justify-center items-center">
                                <div className="w-[50%] py-10 flex flex-col justify-center items-center bg-[#EDAA88] rounded-md p-4">
                                    <h1 className="text-4xl">Upload a Stray</h1>
                                    <input
                                        className="my-3 py-3 px-8 focus:outline-none focus:shadow-sm focus:shadow-black w-full rounded-full bg-[#FFEFDE]"
                                        type="text"
                                        value={add}
                                        placeholder="Enter the address"
                                        onChange={(e) => setAdd(e.target.value)}
                                    />
                                    <div className="relative w-full">
                                        <select
                                            className="block appearance-none my-3 py-3 px-8 focus:outline-none focus:shadow-sm focus:shadow-black w-full rounded-full bg-[#FFEFDE]"
                                            value={animal}
                                            onChange={(e) =>
                                                setAnimal(e.target.value)
                                            }
                                        >
                                            <option value="Dog">Dog</option>
                                            <option value="Cat">Cat</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 12l-4-4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h1>Upload a photo of the animal</h1>
                                    <input
                                        className="my-3 py-3 px-8 focus:outline-none focus:shadow-sm focus:shadow-black w-full rounded-full bg-[#FFEFDE]"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setImg(e.target.files[0])
                                        }
                                    />
                                    <button
                                        className="py-2 px-7 rounded-full my-7 shadow-md shadow-gray-700 bg-[#FF9775]"
                                        onClick={validate}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full h-screen justify-center items-center text-4xl">
                            Please{" "}
                            <a className="ml-4 text-[#B85B2F]" href="/login">
                                Login
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
