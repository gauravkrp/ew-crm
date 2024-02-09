import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useCustomTheme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import dynamic from "next/dynamic";
const Customsidebar = dynamic(() => import("./Sidebar"));
const SidebarProvider = ({ children }: any) => {
  const theme = useCustomTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Customsidebar />
            {children}
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default SidebarProvider;
