import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getNews, getNewSearch } from "../../Redux/reducers/newsSlice";
import { useSelector, useDispatch } from "react-redux";

const NewsList = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, []); //eslint-disable-line

  useEffect(() => {
    dispatch(getNewSearch(value));
  }, [value]);

  const news = useSelector((state) => state.newsReducer.news.data);

  const handleClickEdit = () => {
    //TODO, acciones editar novedades
  };

  const handleClickDelete = () => {
    //TODO, acciones para borrar novedades
  };

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Link to="/backoffice/news/create">Create news</Link>
      <div>
        <input type="text" onChange={handleSearch} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.length &&
              news.map((element) => (
                <TableRow
                  key={element.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {element.name}
                  </TableCell>
                  <TableCell align="right">
                    <img src={element.image} alt="News_image" width="150em" />
                  </TableCell>
                  <TableCell align="right">{element.created_at}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      style={{ marginRight: "1em" }}
                      onClick={handleClickEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleClickDelete}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NewsList;
