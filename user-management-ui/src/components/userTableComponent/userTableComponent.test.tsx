import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserTableComponent from './userTableComponent';
import { getUsers } from '../../services/users';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/users');

describe('UserTableComponent', () => {
  it('renders without crashing', () => {
    render(<UserTableComponent />);
  });

  it('fetches users on mount', async () => {
    const users = [
      { id: '1', name: 'Johny', surname: 'Cage', age: 30, phoneNumber: '1234567890', email: 'john.cage@example.com' },
    ];

    (getUsers as jest.Mock).mockResolvedValue({ data: users });

    act(() => {
      render(<UserTableComponent />);
    });

    await waitFor(() => expect(getUsers).toHaveBeenCalledTimes(1));
  });

  it('displays the correct number of users', async () => {
    const users = [
      { id: '1', name: 'Johny', surname: 'Cage', age: 30, phoneNumber: '1234567890', email: 'johny.cage@example.com' },
    ];

    (getUsers as jest.Mock).mockResolvedValue({ data: users });

    act(() => {
      render(<UserTableComponent />);
    });

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(users.length + 2)); // +2 for the header and add user rows
  });
});