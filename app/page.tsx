import AuthButton from "@/components/auth-button";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(user)}
      <AuthButton page="register" />
    </div>
  );
}
