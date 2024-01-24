import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import verifyToken from "../constants/verifyToken";
import NavBar from "../components/NavBar";
import AnimalCard from "../components/AnimalCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../constants/firebase";

export default function AllPetsPage() {
    const [loading, setLoading] = useState(true);
    const [verify, setVerify] = useState(false);
    const [pets, setPets] = useState();

    const getData = async () => {
        setLoading(true);
        let Allanimals = [];
        const animals = await getDocs(collection(db, "animals"));
        animals.forEach((element) => {
            Allanimals.push(element.data());
        });
        setPets(Allanimals);
        setLoading(false);
    };

    const check = async () => {
        setLoading(true);
        const flag = await verifyToken(document.cookie.slice(6));
        setVerify(flag);
        setLoading(false);
        if (flag) {
            getData();
        }
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
                    {verify ? (
                        <div className="bg-[#FFEFDE] w-full min-h-screen max-h-fit">
                            <NavBar />
                            <div className="pt-[170px] w-[90%] m-auto text-4xl">
                                <h1 className="mb-5">All Animals</h1>
                                <div className="flex justify-evenly items-center flex-wrap">
                                    {pets != undefined &&
                                        pets.map((element, index) => (
                                            <AnimalCard
                                                key={index}
                                                img={element.img}
                                                user={element.user}
                                                add={element.add}
                                                date={element.date}
                                                animal={element.animal}
                                            />
                                        ))}
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
