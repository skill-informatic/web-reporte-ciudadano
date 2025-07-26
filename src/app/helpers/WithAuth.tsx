"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const WithAuthProtect = (Component: any) => {
  // la informacion vendra tipo string, aun asi verificarla
  // el boolean no servira
  const sessionStatus = false;
  return function WithAuthProtect(props: any) {
    useEffect(() => {
      if (!sessionStatus) {
        redirect("/");
      }
    }, []);
    if (!sessionStatus) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default WithAuthProtect;
