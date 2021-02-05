/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

const original = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = original;
});

describe('Profile', () => {

  it('renders component properly', () => {
    render(<Profile />);
    expect(screen.getByText('Display name')).toBeInTheDocument();

  });

});