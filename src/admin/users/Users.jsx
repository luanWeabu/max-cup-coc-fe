import { useMemo, useState } from "react";
import UserService from "../services/UserService";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import UserForm from "./UserForm";
// useMemo được sử dụng để tạo và lưu trữ các cột trong bảng dữ liệu
// column này ở đây được sử dụng như một đối tượng mô tả một cột và các thuộc tính
export default function User() {
  const [users, setUsers] = useState(UserService.getAllUsers());
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(users.length);
  const [currentUserId, setCurrentUserId] = useState(null);

  const showEditUserDialog = (userId) => {
    setCurrentUserId(userId);
    setOpen(true);
  };

  const columns = useMemo(() => {
    return [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "email",
        label: "Email",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "age",
        label: "Age",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "phone",
        label: "Phone",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "access",
        label: "Access",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "action",
        label: "action",
        minWidth: 170,
        align: "center",
        format: (value, user) => {
          return (
            <>
              <IconButton onClick={() => showEditUserDialog(user.id)}>
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={() => deleteUser(user.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    ];
  }, [showEditUserDialog]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const refreshUsers = () => {
    const newUserList = UserService.getAllUsers();
    setUsers(newUserList);
    setTotal(newUserList.length);
  };

  const deleteUser = (UserId) => {
    UserService.deleteById(UserId);
    refreshUsers();
  };

  const updateUser = (updateUser) => {
    debugger;
    UserService.updateByUserId(updateUser);
    const newUserList = UserService.getAllUsers();
    setUsers(newUserList);
    setTotal(newUserList.length);
  };

  return (
    <Paper>
      <Button
        style={{ margin: 20, color: "blue" }}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create User
      </Button>
      <UserForm
        open={open}
        currentUserId={currentUserId}
        refreshUsers={refreshUsers}
        handleClose={() => {
          setCurrentUserId(null);
          setOpen(false);
        }}
        updateUser={updateUser}
      />
      <TableContainer>
        <Table>
          <TableHead style={{ background: "black" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: columns.minWidth, color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow key={user.id} hover>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value, user) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
