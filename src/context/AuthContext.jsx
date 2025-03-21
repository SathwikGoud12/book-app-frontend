import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config.js";

import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";

// Create the authentication context
const AuthContext = createContext();

// Custom hook for using authentication
export const useAuth = () => {
    return useContext(AuthContext);
};

// Google provider instance
const googleProvider = new GoogleAuthProvider();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {  // Fixed name from AuthProvide to AuthProvider
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register a new user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign-In
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };

    // Logout user
    const logout = () => {
        return signOut(auth);
    };

    // Manage user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup function to prevent memory leaks
    }, []);

    // Authentication context value
    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}  {/* Ensure children render only after loading is false */}
        </AuthContext.Provider>
    );
};

// Explicitly export AuthContext in case it's needed elsewhere
export default AuthContext;
