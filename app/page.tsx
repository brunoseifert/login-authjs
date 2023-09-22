"use client";

import AuthButton from "@/components/auth-button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      <h1>Home</h1>
      <h2> Olá, {data?.user?.name}</h2>
      <AuthButton page="register" />
    </div>
  );
}
