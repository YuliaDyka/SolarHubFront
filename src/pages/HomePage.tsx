import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();


  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div>Hi, {user.username}</div>
      <button
        className="mt-4 rounded bg-gray-200 px-4 py-2"
        onClick={async () => {
          await logout();
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
