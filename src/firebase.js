
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAfyxikOK2JAxm9qaSbhk8xZj-SuKyIVlQ",
  authDomain: "netflix-clone-c849c.firebaseapp.com",
  projectId: "netflix-clone-c849c",
  storageBucket: "netflix-clone-c849c.firebasestorage.app",
  messagingSenderId: "219852180361",
  appId: "1:219852180361:web:babf41cff2cc81ee18ef58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email, password);

       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider:"local",
        email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
        try {
           await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
        }
}

const logout = ()=>{
    signOut(auth);

}

export{auth,db,login,signup,logout};