"use client";
import { useEffect, useState } from "react";

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
import NewHeader from "@/components/Layout/NewHeader";

export default function Login() {
  const [users, setUsers] = useState<any>([]);
  const [password, setPassword] = useState<string>("");

  const getApprovals = async () => {
    try {
      const { data } = await axios.get("/api/v1/approval");
      console.log(data);
      setUsers(data?.users);
    } catch (err: any) {
      console.log(err?.response);
    }
  };

  const updateStatus = async (values: any) => {
    try {
      const { data } = await axios.patch("/api/v1/approval", {
        userId: values?.userId,
        status: values?.status,
      });
      if (data?.success == true) {
        setUsers((user: any) =>
          user?.filter((item: any) => item?.id != values?.userId)
        );
      }
    } catch (err: any) {
      console.log(err?.response);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getApprovals();
  }, []);

  return (
    <div className="w-full h-[100dvh]">
      <NewHeader isAuthorized={false} />
      <div className="px-20 flex gap-x-4 flex-wrap gap-y-4 mt-8">
        {users.map((user: any, i: number) => {
          return (
            <Card key={i} className="w-[320px]">
              <CardContent className="h-full pt-4 pb-4">
                <div>
                  <CardTitle className=" text-base">
                    Name:{" "}
                    <span className="text-slate-700 font-medium">{`${
                      user?.first_name
                    } ${user?.last_name || ""}`}</span>
                  </CardTitle>
                  <CardTitle className=" text-base">
                    Email:{" "}
                    <span className="text-slate-700 font-medium">
                      {user?.email}
                    </span>
                  </CardTitle>
                  <CardTitle className=" text-base">
                    Phone Number:{" "}
                    <span className="text-slate-700 font-medium">
                      {user?.phone}
                    </span>
                  </CardTitle>
                </div>
                {/* <CardFooter className="flex justify-end"> */}
                {/* </CardFooter> */}
                <div className="btn flex justify-between mt-4 mb-2">
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      updateStatus({
                        userId: user?.id as number,
                        status: "rejected",
                      })
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    className="text-sm"
                    onClick={() => {
                      console.log("hello");
                      updateStatus({
                        userId: user?.id as number,
                        status: "approved",
                      });
                    }}
                  >
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
