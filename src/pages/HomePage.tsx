import { useEffect, useState } from "react";
import { me, logout } from "../services/auth.service";
import { useNavigate } from "react-router";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    me()
      .then(setUser)
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div>Hi, {user.email}</div>
      <button
        className="mt-4 rounded bg-gray-200 px-4 py-2"
        onClick={async () => {
          await logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
