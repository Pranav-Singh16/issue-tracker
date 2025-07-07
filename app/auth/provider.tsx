"use client";

import { SessionProvider } from "next-auth/react";
// import { Provider } from "next-auth/client";
import React, { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
