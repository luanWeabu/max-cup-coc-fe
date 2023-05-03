import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";

export default function UserForm(props) {
  const [userFormData, setUserFormData] = useState({
    id: props.currentUserId ? props.currentUserId : "",
    name: "",
    email: "",
    age: "",
    phone: "",
    access: "User",
  });

  const [open, setOpen] = useState(props.open);
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({ ...userFormData });

  useEffect(() => {
    if (props.currentUserId) {
      const user = UserService.getUserById(props.currentUserId);
      if (user) {
        setUserFormData({
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          phone: user.phone,
          access: user.access,
        });
        setOriginalFormData({
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          phone: user.phone,
          access: user.access,
        });
      }
    } else {
      setUserFormData({
        id: "",
        name: "",
        email: "",
        age: "",
        phone: "",
        access: "",
      });
      setOriginalFormData({
        id: "",
        name: "",
        email: "",
        age: "",
        phone: "",
        access: "",
      });
    }
    setIsUserUpdate(false);
  }, [props.currentUserId]);

  const handleClose = () => {
    props.handleClose();
    props.refreshUsers();
  };

  const handleAddUser = () => {
    const newId = UserService.createNewId();
    const user = { ...userFormData, id: newId };
    UserService.addUser(user);
    setUserFormData({
      id: "",
      name: "",
      email: "",
      age: "",
      
      phone: "",
      access: "",
    });
    props.handleClose();
    props.refreshUsers();
  };

  useEffect(() => {
    setIsUserUpdate(false);
  }, [open]);

  const handleUpdateUser = () => {
    const updateUser = {
      id: userFormData.id,
      name: userFormData.name,
      email: userFormData.email,
      age: userFormData.age,
      phone: userFormData.phone,
      access: userFormData.access,
    };
    // truyen vao gia tri Id de thay doi
    const success = UserService.updateByUserId(updateUser);
    if (success) {
      setIsUserUpdate(true);
      props.refreshUsers();
      props.handleClose();
      setOpen(false);
    }
    props.refreshUsers(userFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userFormData.id) {
      handleUpdateUser(userFormData);
    } else {
      handleAddUser();
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        {userFormData.id ? "Edit User " : "Create User"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="name"
          value={userFormData.name}
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="email"
          value={userFormData.email}
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="age"
          value={userFormData.age}
          onChange={(e) =>
            setUserFormData({ ...userFormData, age: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="phone"
          value={userFormData.phone}
          onChange={(e) =>
            setUserFormData({ ...userFormData, phone: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          label="access"
          value={userFormData.access}
          disabled
          onChange={(e) =>
            setUserFormData({ ...userFormData, access: e.target.value })
          }
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {userFormData.id ? (
          <Button onClick={handleSubmit}>Save Changes</Button>
        ) : (
          <Button onClick={handleSubmit}>Create</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
