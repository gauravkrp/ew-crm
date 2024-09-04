"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import WithAuth from "@/components/Layout";
import toast from "react-hot-toast";
import Loader from "@/components/common/loader";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const User = ({user, updateStatus}:any) => {
  const [allowDelete, setAllowDelete] = useState(false)
  return (
    <Card className="w-[320px]">
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
      <div className="mt-1 mb-2 w-full flex items-center">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={allowDelete} onCheckedChange={(checked:boolean)=> setAllowDelete(checked)} />
          <Label htmlFor="airplane-mode">Allow Delete</Label>
        </div>
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
              allowDelete: allowDelete,
            });
          }}
        >
          Approve
        </Button>
      </div>
    </CardContent>
  </Card>
  )
} 

function ApproveUsers() {
  const [users, setUsers] = useState<any>([]);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const getApprovals = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/v1/approval");
      console.log(data);
      setUsers(data?.users);
    } catch (err: any) {
      console.log(err?.response);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (values: any) => {
    try {
      setIsLoading(true);

      const { data } = await axios.patch("/api/v1/approval", {
        userId: values?.userId,
        status: values?.status,
        allowDelete: values?.allowDelete,
      });
      if (data?.success == true) {
        setUsers((user: any) =>
          user?.filter((item: any) => item?.id != values?.userId)
        );
      }
      console.log(data);
    } catch (error: any) {
      toast(error?.response?.data?.error || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getApprovals();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[85dvh] w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="px-20 flex gap-x-4 flex-wrap gap-y-4 mt-8">
      {users.map((user: any, i: number) => {
        return (
         <User key={`user-${i}`} user={user} updateStatus={updateStatus} />
        );
      })}
    </div>
  );
}

export default WithAuth(ApproveUsers);
