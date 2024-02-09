"use client";
import dynamic from "next/dynamic";
import Topbar from "@/components/Dashboard/TopBar";
import Table from "@/components/Dashboard/Table";
import { COLORS } from "@/Constants/colors";
const SidebarProvider = dynamic(
  () => import("@/components/Layout/SidebarProvider")
);

const DashBoard = () => {
  return (
    <div className="w-full min-h-[100vh] flex">
      <SidebarProvider>
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: COLORS.BACKGROUND,
          }}
        >
          <Topbar />
          <Table />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashBoard;
