import { useAuth } from "@/context/authContext";
import { Redirect } from "expo-router";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "patient" | "doctor";
}) {
  const { authState } = useAuth();
  // const user = null;
  const loading = false;

  if (loading) return null;

  if (!authState.isLoggedIn) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (role && authState.role !== role) {
    return (
      <Redirect
        href={
          authState.role === "patient" ? "/(patient)/home" : "/(doctor)/home"
        }
      />
    );
  }

  return <>{children}</>;
}
