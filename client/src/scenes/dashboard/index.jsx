import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import OverviewChart from "components/OverviewChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Mã Khách Hàng",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Ngày Tạo",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Số lượng",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Giá trị",
      flex: 0.7,
      renderCell: (params) => `${Number(params.value)} VNĐ`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD - TRANG CHỦ" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Khách Hàng:"
          value={data && data.totalCustomers}
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "90px" }}
            />
          }
        />
        <StatBox
          title="Doanh Thu Ngày:"
          value={data && data.todayStats.totalSales}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "90px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales"/>
        </Box>
        <StatBox
          title="Doanh Thu Tháng"
          value={data && data.thisMonthStats.totalSales}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "90px" }}
            />
          }
        />
        <StatBox
          title="Doanh Thu Năm:"
          value={data && data.yearlySalesTotal}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "90px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="0.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Số Lượng Bán Theo Loại
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Phân tích trạng thái thực tế và thông tin theo danh mục về 
            doanh thu thực hiện trong năm nay và tổng doanh thu.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;