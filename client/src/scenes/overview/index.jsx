import React, {useState} from 'react'
import {Box} from "@mui/material"
import Header from 'components/Header'
import OverviewChart from "components/OverviewChart"


const Overview = () => {
const [view] = useState("sales")

return (
    <Box m="1.5rem 2.5rem">
        <Header title="OVERVIEW - TỔNG QUAN" subtitle="Biểu đồ doanh thu tổng quan:" />
        <Box height="75vh">
            <OverviewChart view={view}/>
        </Box>
    </Box>
  )
}

export default Overview