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
import WithAuth from "@/components/Layout";
import Loader from "@/components/common/loader";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast("Please fill all the fields");
      return;
    }
    if (password != confirmPassword) {
      toast("Password and confirm password are not same");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("TOKEN", data?.sessionToken);
      toast(`Successfully logged in!`);
    } catch (err: any) {
      toast(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-16 flex items-center justify-center">
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
              <Link className="text-blue-800 font-semibold" href={"/login"}>
                Login
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSignup}>
            {isLoading ? (
              <Loader color="#fff" size="16px" borderWidth="2px" />
            ) : (
              "Signup"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WithAuth(Signup);
