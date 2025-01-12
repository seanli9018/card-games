"use client";

import { createContext, useContext } from "react";
import { UserContextType } from "./user.type";

// Create the UserContext
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
