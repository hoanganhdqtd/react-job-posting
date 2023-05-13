import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import api from "../data/fetchData";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

// https://www.youtube.com/watch?v=rv9F1O6jV1Y
// React Material UI Pagination with Custom Routing
const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
    // "& .MuiTouchRipple-root": {
    //   color: "#d74742",
    // },
    "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#d74742",
    },
  },
}));

function Home() {
  const [jobs, setJobs] = useState([]);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getJobs(page, q);
      setJobs(data.jobs);
      setPagesTotal(data.pagesTotal);
    };
    fetch();
  }, [page, q]);

  return (
    <Container sx={{ p: 3 }} maxWidth="lg">
      {jobs.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid key={job.id} item lg={3} md={4} sm={6} xs={12}>
                <JobCard
                  id={job.id}
                  title={job.title}
                  description={
                    job.description.length > 100
                      ? job.description.slice(0, 100) + "..."
                      : job.description
                  }
                  skills={job.skills}
                />
              </Grid>
            ))}
          </Grid>
          <CenterPagination
            sx={{
              marginTop: "15px",
              // "Button.MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
              //   backgroundColor: "#d74742",
              // },
            }}
            count={pagesTotal}
            color="primary"
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </>
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          No Result
        </Typography>
      )}
    </Container>
  );
}

export default Home;
