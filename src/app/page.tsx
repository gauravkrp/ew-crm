"use client";
// import { getLeads } from "@/api/leads";
import withLayout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
// import { apiInstance, setAuthToken } from "@/api";

const columns = [
  {
    name: "id",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row: any) => row?.gender[0],
  },
  {
    name: "Mobile",
    selector: (row: any) => row?.mobile_number,
  },
  {
    name: "Desired Course",
    selector: (row: any) => row?.desired_course,
    sortable: true,
  },
  {
    name: "Desired Country",
    selector: (row: any) => row?.desired_country,
    sortable: true,
  },
];

function Home() {
  const [leadsData, setLeadsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  // const fetchData = async (page = 1, limit = 10) => {
  //   try {
  //     const {
  //       data: { data, meta },
  //     } = await getLeads({ page, limit });
  //     setLeadsData(data);
  //     setTotalRows(meta?.filter_count || 0);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlePageChange = (page: number) => {
    // fetchData(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    // fetchData(page, newPerPage);
    setPerPage(newPerPage);
  };

  // const getToken = async () => {
  //   const token = localStorage.getItem("Token");
  //   if (token) {
  //     setAuthToken(token);
  //     fetchData();
  //   } else {
  //     router.push("/auth");
  //   }
  // };

  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <>
      <div className="md:mx-20 my-2 py-4 px-2 shadow-md rounded-lg">
        <DataTable
          title={"Student Leads"}
          columns={columns}
          data={leadsData}
          fixedHeader={true}
          // pagination
          // paginationServer
          // paginationTotalRows={totalRows}
          // paginationDefaultPage={currentPage}
          // onChangeRowsPerPage={handlePerRowsChange}
          // onChangePage={handlePageChange}
        />
      </div>
    </>
  );
}

export default withLayout(Home);
