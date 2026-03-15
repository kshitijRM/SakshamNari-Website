import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AppUser = {
  id: string;
  email: string;
  full_name?: string;
};

interface AuthContextType {
  user: AppUser | null;
  session: { user: AppUser } | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const safeParse = (raw: string | null, fallback: any) => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<{ user: AppUser } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear legacy persisted auth and only restore from the active browser session.
    localStorage.removeItem("app_current_user");
    const raw = sessionStorage.getItem("app_current_user");
    if (raw) {
      const parsed = safeParse(raw, null) as AppUser | null;
      if (parsed?.id && parsed?.email) {
        setUser(parsed);
        setSession({ user: parsed });
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = fullName.trim();

    if (!normalizedEmail) {
      return { error: { message: "Email is required" } };
    }

    if (password.length < 6) {
      return { error: { message: "Password must be at least 6 characters" } };
    }

    const usersRaw = localStorage.getItem("app_users");
    const users = safeParse(usersRaw, []);

    if (!Array.isArray(users)) {
      localStorage.setItem("app_users", JSON.stringify([]));
    }

    const safeUsers = Array.isArray(users) ? users : [];

    const exists = safeUsers.find((u: any) => (u?.email || "").toLowerCase() === normalizedEmail);
    if (exists) {
      return { error: { message: "User already registered" } };
    }

    const newUser = {
      id: createId(),
      email: normalizedEmail,
      full_name: normalizedName,
      password,
    };

    safeUsers.push(newUser);
    localStorage.setItem("app_users", JSON.stringify(safeUsers));

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return { error: { message: "Email and password are required" } };
    }

    const usersRaw = localStorage.getItem("app_users");
    const users = safeParse(usersRaw, []);
    const safeUsers = Array.isArray(users) ? users : [];

    const found = safeUsers.find(
      (u: any) => (u?.email || "").toLowerCase() === normalizedEmail && u?.password === password,
    );

    if (!found) {
      return { error: { message: "Invalid login credentials" } };
    }

    const safeUser: AppUser = {
      id: found.id,
      email: found.email,
      full_name: found.full_name,
    };

    sessionStorage.setItem("app_current_user", JSON.stringify(safeUser));
    setUser(safeUser);
    setSession({ user: safeUser });

    return { error: null };
  };

  const signOut = async () => {
    sessionStorage.removeItem("app_current_user");
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
