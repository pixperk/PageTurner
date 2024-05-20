import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import conf from "../conf/conf";

const FirebaseContext = createContext(null);

const firebaseApp = initializeApp(conf);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  }, []);

  const signUpUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const isLoggedIn = user ? true : false;

  const handleCreateNewListing = async (name, author, price, isbn, cover) => {
    try {
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${cover.name}`
      );
      const uploadResult = await uploadBytes(imageRef, cover);
      return await addDoc(collection(firestore, "books"), {
        name,
        author,
        price,
        isbn,
        imageURL: uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error creating new listing", error);
    }
  };

  const listAllBooks = async () => {
    try {
      return await getDocs(collection(firestore, "books"));
    } catch (error) {
      console.error("Error listing all books", error);
    }
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (bookId, quantity) => {
    if(!user) return null
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    });
    return result;
  };

  const fetchBooks = async(userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where('userID', '==', userId));
    const result = await getDocs(q)
    return(result);
  };

  const getOrders = async(bookId)=>{
    const collectionRef = collection(firestore, 'books', bookId, 'orders')
    const result = await getDocs(collectionRef)
    return result
  }

  const logOut = () => {
    signOut(firebaseAuth);
  };

  const value = {
    signUpUserWithEmailAndPassword,
    signInUserWithEmailAndPassword,
    signInWithGoogle,
    isLoggedIn,
    handleCreateNewListing,
    listAllBooks,
    getBookById,
    getImageURL,
    placeOrder,
    fetchBooks,
    getOrders,
    logOut,
    user
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
