import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function MainPage () {
    return (
        <main className="">
            {/* <button onClick={() => {
                addDoc(collection(db, "tasks"), {
                    text: "Написати Firestore приклад",
                    completed: false
                });
                console.log("done")
            }}>
                Тисни, ублюдок
            </button> */}
        </main>
    )
}