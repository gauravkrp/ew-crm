import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "@/theme";
import { COLORS } from "@/Constants/colors";

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  const theme = useTheme();

  return (
    <MenuItem
      active={selected === title}
      style={{ color: theme.palette.grey[200] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link href={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Customsidebar = () => {
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const theme = useTheme();
  const [selected, setSelected] = useState("Dashboard");

  const colors = tokens();

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          display: "flex",
          height: "100vh",
          top: 0,
          bottom: 0,
          zIndex: 10000,
          "& .sidebar": {
            border: "none",
          },
          "& .menu-icon": {
            backgroundColor: "transparent !important",
          },
          "& .menu-item": {
            // padding: "5px 35px 5px 20px !important",
            backgroundColor: "transparent !important",
          },
          "& .menu-anchor": {
            color: "inherit !important",
            backgroundColor: "transparent !important",
          },
          "& .menu-item:hover": {
            color: `${COLORS.PRIMARY} !important`,
            backgroundColor: "transparent !important",
          },
          "& .menu-item.active": {
            color: `${COLORS.SECONDARY} !important`,
            backgroundColor: "transparent !important",
          },
        }}
      >
        <Sidebar breakPoint="md" backgroundColor={COLORS.WHITE}>
          <Menu>
            {!collapsed ? (
              <Box
                display="flex"
                justifyContent={"flex-end"}
                alignItems="center"
              >
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ m: "12px 0 12px 0" }}
              >
                <MenuOutlinedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => collapseSidebar()}
                />
              </Box>
            )}
            {/* </MenuItem> */}
            {!collapsed && (
              <Box mb="25px">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    "& .avater-image": {
                      backgroundColor: colors.primary[500],
                    },
                  }}
                >
                  <img
                    className="avater-image"
                    alt="profile user"
                    width="100px"
                    height="100px"
                    src={"/assets/logo.png"}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h5"
                    className=" text-gray-700"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    EduWorldGlobal
                  </Typography>
                </Box>
              </Box>
            )}
            <Box paddingLeft={collapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                className="text-gray-500"
                sx={{ m: "15px 20px 5px 20px" }}
              >
                Placements
              </Typography>
              <Item
                title="Manage Colleges"
                to="/colleges"
                icon={<SchoolOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Manage Placements"
                to="/placements"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Dummy"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
};

export default Customsidebar;
