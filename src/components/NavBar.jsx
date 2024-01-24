import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="flex ml-5 w-[60%] absolute justify-between items-center top-0">
            <img className="w-[80px]" src="/logo.png" alt="" />
            <ul className="flex w-[50%] justify-between items-center">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <a href="#about">
                    <li>About</li>
                </a>
                <Link to="/pets">
                    <li>Pets</li>
                </Link>
                <Link to="/upload">
                    <li>Upload</li>
                </Link>
            </ul>
        </div>
    );
}
