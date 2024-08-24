"use client";
import { getLeads } from "@/api/leads";
import withLayout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = async () => {
    try {
      const {
        data: {
          data: { access_token: token },
        },
      } = await axios.post("https://crm.edugyanam.com/auth/login", {
        email,
        password,
      });
      localStorage.setItem("Token", token);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to login");
    }
  };

  return (
    <>
      <div className="md:mx-20 my-2 py-4 px-2 flex justify-center pt-16">
        <div className="shadow rounded-lg bg-slate-100 flex flex-col p-8 items-center">
          <div className="w-40 relative h-20">
            <Image src={"/assets/logo.png"} fill alt="Education World" />
          </div>
          <div className="auth_container">
            <div className="auth_title text-center my-2">Login</div>
            <div className="flex flex-col gap-y-4">
              <input
                className="input_mobile bg-white py-1 px-2 rounded-lg typographyColors-inputField"
                placeholder="Enter Email"
                // maxLength={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input_mobile bg-white py-1 px-2 rounded-lg typographyColors-inputField"
                placeholder="Enter Password"
                // maxLength={4}
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <button
              className="login_btn"
              onClick={() => {
                console.log("hello");

                login();
              }}
            >
              Login
            </button>
          </div>
        </div>
        {/* <div className="w-full h-full flex flex-col items-center justify-evenly">
          <div className="w-40 relative h-20">
            <Image src={"/assets/logo.png"} fill alt="Education World" />
          </div>
          <div className="auth_container">
            <div className="auth_title">Login</div>
            <input
              className="input_mobile bg-cream1 typographyColors-inputField"
              placeholder="Enter OTP"
              type={"number"}
              maxLength={4}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PhoneInput
              country={"in"}
              enableSearch={true}
              value={mobile}
              className={`input-mobile mt-2`}
              onChange={(phone) => {
                setMobile(phone);
              }}
            />
            <button className="login_btn" onClick={sendOtp}>
            {isLogin ? `Login` : `Register`} with OTP
            </button>
          </div>
          <div className="bottom_line">
            {isLogin ? `New to Sprout?` : `Already a Sprout User?`}{" "}
            <span
              className="color_green cursor-pointer"
              role={"button"}
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={() => {
                setIsLogin(!isLogin)
              }}
            >
              {` `}
              {isLogin ? `Register` : "Login"}
            </span>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default withLayout(Auth);
