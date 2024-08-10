"use client";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSignup = async () => {
    if (!email || !password) return;
    try {
      const { data } = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("TOKEN", data?.session_jwt);
      setMessage("Successfully logged in!");
    } catch (err: any) {
      setError(err?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[100dvh] relative p-6">
      <Card className="flex flex-col sm:is-[450px]">
        <CardContent className="p-6 sm:!p-12">
          <Link href="/" className="flex justify-center items-center mbe-6">
            {/* <Logo /> */}
          </Link>
          <div className="flex flex-col gap-5">
            <div>
              <Typography variant="h4">{`Welcome to Edugyanam CRM!👋🏻`}</Typography>
              <Typography className="mbs-1">
                Please sign-up to your account and start the adventure
              </Typography>
            </div>
            <div>
              <TextField
                autoFocus
                fullWidth
                onChange={(e: any) => setEmail(e?.target.value)}
                label="Email"
                style={{ marginBottom: 20 }}
              />
              <TextField
                fullWidth
                label="Password"
                id="outlined-adornment-password"
                style={{ marginBottom: 10 }}
                onChange={(e: any) => setPassword(e?.target.value)}
              />
              <div className="flex justify-between items-center gap-x-3 gap-y-1 mb-4 flex-wrap">
                <Typography
                  className="text-end"
                  color="primary"
                  component={Link}
                  href="/forgot-password"
                >
                  Forgot password?
                </Typography>
              </div>
              <Button
                fullWidth
                variant="contained"
                style={{ background: "#000", marginBottom: 20 }}
                onClick={() => {
                  handleSignup();
                }}
              >
                Log In
              </Button>
              <div className="flex justify-center items-center flex-wrap gap-2">
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href="/auth/login" color="primary">
                  Login
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
