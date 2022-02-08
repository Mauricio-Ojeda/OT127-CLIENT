import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Material UI
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../Redux/reducers/membersSlice";

const MembersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMembers());
  }, []); //eslint-disable-line

  const { members } = useSelector((state) => state.membersReducer);

  const handleEdit = (id) => {
    // Logica a desarrollar
  };

  const handleDelete = (id) => {
    // Logica a desarrollar
  };

  // estilos
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableRowClasses.root}`]: {
      height: "50px",
      width: "70px",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // fin de estilos
  return (
    <Container maxWidth="md">
      <Link to="/backoffice/members/create">Create Member</Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Photo</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <StyledTableRow key={member.id}>
                <StyledTableCell scope="row">{member.name}</StyledTableCell>
                <StyledTableCell>
                  <img src={member.image} alt={member.name} width="50px" />
                </StyledTableCell>
                <StyledTableCell style={{ width: "25%" }}>
                  <Button color="success" onClick={() => handleEdit(member.id)}>
                    Editar
                  </Button>{" "}
                  <Button color="error" onClick={() => handleDelete(member.id)}>
                    Eliminar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MembersList;
