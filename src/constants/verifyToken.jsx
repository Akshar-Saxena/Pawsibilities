import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const verifyToken = async (token) => {
    let flag = false;
    const users = await getDocs(collection(db, "users"));
    users.forEach((element) => {
        if (JSON.stringify(element.data().id) == token) {
            flag = true;
        }
    });
    return flag;
};

export default verifyToken;
