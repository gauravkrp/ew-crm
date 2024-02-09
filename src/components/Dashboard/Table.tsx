import { Box, MenuItem, Select, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Calendar from "@mui/icons-material/CalendarMonth";
import { tokens } from "@/theme";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { dummyData } from "@/SampleData";
import { COLORS } from "@/Constants/colors";

const Table = () => {
  const colors = tokens();
  const [month, setMonth] = useState(1);

  const columns: any = [
    { field: "id", headerName: "Id" },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "email", headerName: "Email", width: 240 },
    {
      field: "access",
      headerName: "Access Llvel",
      width: 100,
    },
  ];

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };
  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"30px"}
      >
        <Box>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            // sx={{ mb: "5px" }}
          >
            <span style={{ color: COLORS.SECONDARY }}>82,000</span> Leads
            Generated
          </Typography>
        </Box>
        <Box
          className="flex justify-end"
          sx={{ position: "relative" }}
          px={0.2}
          borderRadius={2}
        >
          <div className="flex relative -right-8 z-40 items-center justify-center">
            <Calendar />
          </div>
          <Select
            value={month}
            sx={{
              borderColor: "transparent",
              backgroundColor: COLORS.WHITE,
              height: 40,
              minWidth: 180,
              paddingLeft: 3,
            }}
            onChange={handleChange}
          >
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
          </Select>
        </Box>
      </Box>

      {/*  Table */}
      <Box
        m="8px 0 0 0"
        height="80svh"
        className="shadow-md bg-white"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: "#000",
            fontSize: 16,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: COLORS?.PRIMARY,
            borderBottom: "none",
            fontSize: 15,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: COLORS?.PRIMARY,
            borderBottom: "none",
            fontSize: 15,
          },
          "& .MuiCheckbox-root": {
            color: `${COLORS.SECONDARY} !important`,
          },
          [`& .${gridClasses.row}.even`]: {
            backgroundColor: "#fff",
          },
          [`& .${gridClasses.row}.odd`]: {
            backgroundColor: COLORS?.TABLE.SECONDARY,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={dummyData}
          columns={columns}
          sx={{
            [`& .${gridClasses.row}.even`]: {
              //   backgroundColor: "#000",
            },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
    </Box>
  );
};

export default Table;
