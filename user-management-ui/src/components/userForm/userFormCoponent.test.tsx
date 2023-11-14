import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserFormComponent from './userFormComponent';
import { NewUser, User } from '../../interfaces/users';

describe('UserFormComponent', () => {
  it('renders without crashing', () => {
    const mockUpdateUserData = jest.fn();
    const newUser: NewUser = { name: '', surname: '', age: 0, phoneNumber: '', email: '', login: '', password: '11' };
    render(<UserFormComponent userData={newUser} updateUserData={mockUpdateUserData} isEdit={false} />);
  });

  it('calls updateUserData when the form is submitted', () => {
    const mockUpdateUserData = jest.fn();
    const newUser: NewUser = { name: '', surname: '', age: 0, phoneNumber: '', email: '', login: '', password: '11' };

    render(<UserFormComponent userData={newUser} updateUserData={mockUpdateUserData} isEdit={false} />);

    fireEvent.submit(screen.getByRole('form'));

    expect(mockUpdateUserData).toHaveBeenCalled();
  });

  it('displays the correct initial data when isEdit is true', () => {
    const mockUpdateUserData = jest.fn();
    const userData: User = { name: 'Johny', surname: 'Cahe', age: 30, phoneNumber: '1234567890', email: 'john.doe@example.com', login: 'BigJohny' };

    render(<UserFormComponent userData={userData} updateUserData={mockUpdateUserData} isEdit={true} />);

    expect(screen.getByLabelText('Name')).toHaveValue(userData.name);
    expect(screen.getByLabelText('Surname')).toHaveValue(userData.surname);
    expect(screen.getByLabelText('Age')).toHaveValue(userData.age);
    expect(screen.getByLabelText('Phone Number')).toHaveValue(userData.phoneNumber);
    expect(screen.getByLabelText('Email')).toHaveValue(userData.email);
  });
});