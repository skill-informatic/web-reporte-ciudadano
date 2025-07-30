"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch } from "react-redux";
import { auth } from "@/firebase/firebaseConfig";
import { login, logout } from "../store/slices/user";
import { useRouter } from "next/navigation";

export const useAuthListener = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("use auth listener", user);
      if (user) {
        console.log("use auth listener user", user);
        dispatch(login({ uid: user.uid, email: user.email || "" }));
        router.push("/views/dashboard/reports_main");
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
