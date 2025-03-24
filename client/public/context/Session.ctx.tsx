"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";
// Define the user data type
interface User {
  username: string;
  contact: string;
  location: string;
  ip: string | null;
  _id: string | null
}

// Define the context type
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: (_id?: string) => Promise<void>;
  updateUser: (updatedFields: Partial<User>) => void;
}

// Create the Context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("ICHuser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData: User) => {
    try {
      const response = await fetch("https://ich-1gjz.onrender.com/client/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success(`Welcome ${data.username}`)

      setUser(data);
      localStorage.setItem("ICHuser", JSON.stringify(data));

    } catch (error) {
      console.error("Error sending data:", error);
      toast.error(`${error}`)
    }
  };

  const logout = async (_id?: string) => {
    if (!_id) {
      toast.error("No user ID provided for logout");
      return;
    }

    try {
      // ✅ Ensure fetch request uses `_id` directly
      const response = await fetch(`https://ich-1gjz.onrender.com/client/${_id}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success("Logged Out")

      // ✅ Remove user from local storage *after* successful API call
      localStorage.removeItem("ICHuser");
      setUser(null); // ✅ Update state after logout

      // ✅ Show success toast
    } catch (error: any) {
      console.error("Error sending data:", error);
      toast.error("Error Occurred");
    }
};


  // Function to update user details
  const updateUser = (updatedFields: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedFields };
      setUser(updatedUser);
      localStorage.setItem("ICHuser", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
