import React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe('handleAuthentication', () => {
  it('should set isAuthenticated to true when result is true', () => {
    // Arrange
    const { result } = renderHook(() => React.useState(false));
    const [isAuthenticated, setIsAuthenticated] = result.current;
    const handleAuthentication = (result: boolean) => {
      setIsAuthenticated(result);
    };

    // Act
    act(() => handleAuthentication(true));

    // Assert
    expect(isAuthenticated).toBe(true);
  });

  it('should set isAuthenticated to false when result is false', () => {
    // Arrange
    const { result } = renderHook(() => React.useState(true));
    const [isAuthenticated, setIsAuthenticated] = result.current;
    const handleAuthentication = (result: boolean) => {
      setIsAuthenticated(result);
    };

    // Act
    act(() => handleAuthentication(false));

    // Assert
    expect(isAuthenticated).toBe(false);
  });
});
