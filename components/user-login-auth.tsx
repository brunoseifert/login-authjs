"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  email: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [data, setData] = useState<IUser>({ email: "", password: "" });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={data.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
