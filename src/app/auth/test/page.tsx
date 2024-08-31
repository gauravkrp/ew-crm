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

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill all the fields");
      return;
    }
    if (password != confirmPassword) {
      alert("Password and confirm password are not same");
      return;
    }
    try {
      const { data } = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("TOKEN", data?.session_jwt);
      alert(`Successfully logged in!`);
    } catch (err: any) {
      alert(err?.message);
    }
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center">
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
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
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e?.target?.value);
                }}
              />
            </div>
            <div className="text-sm">
              Already have an account?{" "}
              <Link
                className="text-blue-800 font-semibold"
                href={"/auth/login"}
              >
                Login
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSignup}>Signup</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
