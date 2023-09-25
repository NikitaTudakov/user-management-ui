import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getUsers } from '../../api';
import { User } from '../../interfaces/users';
import './userTableComponent.scss'
import UserDialog from '../userDialog/userDialogComponent';
import DeleteDialog from '../deleteDIalog/deleteDialogComponent';

const UserTableComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // get users on component mount
  useEffect(() => {
    getTableUsers();
  }, []);

  // open dialog window
  const openDialog = (user: User | null) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

    // open delete dialog window
    const openDeleteDialog = (user: User) => {
      console.log('here')
      setSelectedUser(user);
      setIsDeleteDialogOpen(true);
    };


  // get users from api
  const getTableUsers = () => {
    getUsers()
      .then((data) => {
        const sortedUsers = data.sort((a: User, b: User) => a.id - b.id);
        setUsers(sortedUsers)
      })
      .catch((error) => console.error('Error fetching users:', error));
  }

  return (
    <div id='table-container'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow id='table__head-row'>
                <TableCell>№</TableCell>
                <TableCell>name</TableCell>
                <TableCell>surname</TableCell>
                <TableCell>age</TableCell>
                <TableCell>phone Number</TableCell>
                <TableCell>email</TableCell>
                <TableCell>actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow id='table__action-row'>
                    <TableCell colSpan={6} id='add-row'></TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => openDialog(null)}>Add User</Button>
                    </TableCell>
                </TableRow>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell id='table__action-cell'>
                    <Button variant="contained" onClick={() => openDialog(user)}>Edit</Button>
                    <Button
                      variant="contained"
                      onClick={() => openDeleteDialog(user)}
                      id='table__action-cell__delete-btn'
                    >
                        Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>

      {/* user modal window */}
      {isDialogOpen && (
        <UserDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            getTableUsers();
          }}
          user={selectedUser}
        />
      )}

      {/* delete modal window */}
      {isDeleteDialogOpen && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            getTableUsers();
          }}
          user={selectedUser as User}
        />
      )}
    </div>
  );
};

export default UserTableComponent;
