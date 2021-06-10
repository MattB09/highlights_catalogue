import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitForElementToBeRemoved, 
  waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Home from './components/Home';
import {Context } from './App';
import { AuthContext } from './Auth';

const TESTID = '1234';
const TESTEMAIL = 'test@test.com';
const testUser = { email: TESTEMAIL, uid: TESTID}
const testState = { 
  data: {
    highlights: [],
    authors: [
      {id: 1, name: 'Pierce Brown', user_id: TESTID},
      {id: 2, name: 'Cixin Liu', user_id: TESTID},
    ],
    books: [
      {id: 1, title: 'Red Rising', name: 'Pierce Brown', author_id: 1}
    ],
    tags: [],
  },
  filters: {author: "", book: "", tag: ""}
}
const dispatch = jest.fn()

const renderWithContext = (comp) => {
  return render(
    <AuthContext.Provider value={{currentUser: testUser}}>
      <Context.Provider value = {{state, dispatch}}>
        { comp }
      </Context.Provider>
    </AuthContext.Provider>
  )

}

describe('Home component', ()=> {
  function renderHome() {
    renderWithContext(<Home />);
  }

  describe('Home component render tests', () => {  
    test('logo renders', () => {
      renderHome();
      const logo = screen.getByAltText(/Mylights logo/i);
      expect(logo).toBeInTheDocument();
    });

    test('logged in user text renders', () => {
      renderHome();
      const loggedInText = screen.getByText(`logged in as ${TESTEMAIL.split('@')[0]}`, {exact: false});
      expect(loggedInText).toBeInTheDocument();
    });

    test('Logout button renders', () => {
      renderHome();
      const logoutBtn = screen.getByText(/Log out/i);
      expect(logoutBtn).toBeInTheDocument();
    })

    test('filters titles render', () => {
      renderHome();
      expect(screen.getByText(/Authors/)).toBeInTheDocument();
      expect(screen.getByText(/Books/)).toBeInTheDocument();
      expect(screen.getByText(/Tags/)).toBeInTheDocument();
    });

    test('Highlights section renders', () => {
      renderHome();
      expect(screen.getByText(/Highlights/)).toBeInTheDocument();
    });
  });

  describe.only('Home component actions', () => {
    // this is failing because the reducer functions are not provided on render..
    test('clear filters button clears filters', async () => {
      render(
        <AuthContext.Provider value={{currentUser: testUser}}>
          <Context.Provider value = {{state: {...testState, filters: {author: 1}}, dispatch}}>
            <Home />
          </Context.Provider>
        </AuthContext.Provider>
      );

      fireEvent.click(screen.getByText(/clear filters/i));

      await waitFor(() => {
        expect(screen.getByText(/cixin liu/i)).toBeInTheDocument();
      })
    })
  });
});
