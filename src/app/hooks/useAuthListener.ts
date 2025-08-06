"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "@/firebase/firebaseConfig";
import { login, logout } from "../store/slices/user";
import { useRouter, usePathname } from "next/navigation";

export const useAuthListener = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("use auth listener", user);
      console.log("pathname", pathname);
      if (pathname === "/views/login" && user) {
        router.push("/views/dashboard/reports_main");
        return;
      }
      if (user) {
        dispatch(login({ uid: user.uid, email: user.email || "" }));
      } else {
        dispatch(logout());
        router.push("/views/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, pathname]);

  return { loading };
};
