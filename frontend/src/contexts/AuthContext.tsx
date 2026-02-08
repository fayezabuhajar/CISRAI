import React, { createContext, useContext, useState, useEffect } from "react";
import {
  authAPI,
  type ApiUser,
  getToken,
  getStoredUser,
  removeToken,
  removeStoredUser,
} from "../services/api";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      data?: { error?: string; message?: string };
      message?: string;
    };
    return (
      maybeError.data?.error ||
      maybeError.data?.message ||
      maybeError.message ||
      fallback
    );
  }

  return fallback;
};

interface AuthContextType {
  user: ApiUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      setUser(response.user);
      setToken(response.token);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, "فشل تسجيل الدخول");
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authAPI.register(data);
      setUser(response.user);
      setToken(response.token);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, "فشل التسجيل");
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      // Try to call logout API but don't fail if it doesn't work
      await authAPI.logout().catch(() => {
        console.log("Logout API call failed, but continuing with local logout");
      });
    } catch (err: unknown) {
      console.error("Logout error:", err);
    } finally {
      // Always clear local data regardless of API call result
      removeToken();
      removeStoredUser();
      setUser(null);
      setToken(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
