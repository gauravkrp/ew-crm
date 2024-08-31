"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      toast("Please fill all the fields");
      return;
    }
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("TOKEN", data?.sessionToken);
      toast(`Successfully logged in!`);
      router.push("/dashboard");
    } catch (err: any) {
      toast(err?.message);
    }
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center">
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>{`Welcome to Edugyanam CRM!👋🏻`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => {
                  setEmail(e?.target?.value);
                }}
                type="email"
                id="email"
                placeholder="Enter email ...."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e?.target?.value);
                }}
              />
            </div>
            <div className="text-sm">
              Already have an account?{" "}
              <Link
                className="text-blue-800 font-semibold"
                href={"/auth/signup"}
              >
                Signup
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
