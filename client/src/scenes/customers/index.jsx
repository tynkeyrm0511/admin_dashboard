import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex:0.8
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      flex:0.6
    },
    {
      field: "email",
      headerName: "Email",
      flex:0.8
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      flex:0.6
    },
    {
      field: "adress",
      headerName: "Địa chỉ",
      flex:1
    },
    {
      field: "role",
      headerName: "Vai trò",
      flex:0.2
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS - KHÁCH HÀNG" subtitle="Danh sách khách hàng:" />
      <Box
        mt="40px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;