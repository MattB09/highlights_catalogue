import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'

import Home from './components/Home';
import {Context } from './App';
import { AuthContext } from './Auth';

const TESTID = '1234';
const TESTEMAIL = 'test@test.com';
const testUser = { email: TESTEMAIL, uid: TESTID}
const testState = { 
  state: {
    data: {
      highlights: [],
      authors: [
        {id: 1, name: 'Pierce Brown', user_id: TESTID},
        {id: 2, name: 'Cixin Liu', user_id: TESTID},
      ],
      books: [],
      tags: [],
    },
    filters: {author: "", book: "", tag: ""}
  },
  dispatch: jest.fn()
}

const renderWithContext = (comp) => {
  return render(
    <AuthContext.Provider value={{currentUser: testUser}}>
      <Context.Provider value = {testState}>
        { comp }
      </Context.Provider>
    </AuthContext.Provider>
  )

}

describe('Home component render tests', () => {  
  test('logo renders', () => {
    renderWithContext(<Home />);
    const logo = screen.getByAltText(/Mylights logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('logged in user text renders', () => {
    renderWithContext(<Home />);
    const loggedInText = screen.getByText(`logged in as ${TESTEMAIL.split('@')[0]}`, {exact: false});
    expect(loggedInText).toBeInTheDocument();
  });
});
