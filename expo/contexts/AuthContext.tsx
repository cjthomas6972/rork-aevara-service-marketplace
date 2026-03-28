import createContextHook from "@nkzw/create-context-hook";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/mocks/data";

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("aevara_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (role: UserRole) => {
    const selectedUser = mockUsers.find((u) => u.role === role) || mockUsers[0];
    await AsyncStorage.setItem("aevara_user", JSON.stringify(selectedUser));
    setUser(selectedUser);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("aevara_user");
    setUser(null);
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
});
