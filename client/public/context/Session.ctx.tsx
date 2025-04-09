"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { useLoading } from "./Loading.ctx";
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
  logout: () => Promise<void>;
  updateUser: (updatedFields: Partial<User>) => void;
}

// Create the Context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { hideLoading, isLoading, showLoading } = useLoading()
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("ICHuser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setUser(user)
        console.log("Updated user:", user);
      }, 100);

      return () => clearTimeout(timer); // Clean up
    }
  }, [user]);

  const login = async (userData: User) => {
    showLoading()
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
      if (data.username === undefined) {
        toast("Unstable Internet Connectivity")
      }
      toast.success(`Welcome ${data.username}`)

      setUser(data);
      localStorage.setItem("ICHuser", JSON.stringify(data));

      hideLoading()

    } catch (error) {
      console.error("Error sending data:", error);
      toast.error(`${error}`)
    }
  };

  const logout = async () => {

    // Toast function for notifications
    const Toast = (message: string, icon: string) => {
      toast.success(message, {
        duration: 4000,
        style: {
          fontWeight: 600,
          background: "#FCA331",
          borderRadius: "25px",
          zIndex: '9090000000'
        },
        icon,
      });
    };

    try {
      // ✅ Ensure fetch request uses `_id` directly

      let session: User | null = null;

      const userString = localStorage.getItem("ICHuser");

      if (userString) {
        session = JSON.parse(userString) as User;
        const response = await fetch(`https://ich-1gjz.onrender.com/client/${session._id}/logout`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        await localStorage.removeItem("ICHuser")
        await localStorage.removeItem("cart")
        setUser(null); // ✅ Update state after logout
        Toast("Logged Out", "🤖")
      }


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
