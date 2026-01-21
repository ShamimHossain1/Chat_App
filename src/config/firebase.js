// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChN7bjYynH5yIb5nopjOfNGFkJKR-8lF8",
  authDomain: "project-34dca.firebaseapp.com",
  projectId: "project-34dca",
  storageBucket: "project-34dca.firebasestorage.app",
  messagingSenderId: "110569725808",
  appId: "1:110569725808:web:49ab661b1e081a8110b9b5",
  measurementId: "G-82Z8MBNLRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, 'user', user.uid),{
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar:"",
            bio:"Hey there! I am using Chat App.",
            lastSeen: Date.now(),
        })
        await setDoc(doc(db,'chats', user.uid),{
            chatData: []
        })
    }catch(err){
        console.log(err);
        toast.error(err.code);
    }

}

export {auth, db, signup};
