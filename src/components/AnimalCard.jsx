import React from "react";

export default function AnimalCard(props) {
    return (
        <div className="w-[270px] bg-[#FF9775] h-[350px] rounded-lg p-6 m-2">
            <img src={props.img} alt="" className="" />
            <h1 className="text-lg mt-4">Address: {props.add}</h1>
            <h2 className="text-lg">Animal: {props.animal}</h2>
            <h1 className="text-xs">Uploaded by - {props.user}</h1>
            <h1 className="text-xs">Uploaded on - {props.date}</h1>
        </div>
    );
}
