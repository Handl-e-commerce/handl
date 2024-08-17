import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';
import { cookieParser } from '../../utils/cookie-util';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

let replaceMock = jest.fn();
Object.defineProperty(window, 'location', {
    value: {
        hash: {
        endsWith: replaceMock,
        includes: replaceMock,
        },
        replace: replaceMock,
    },
    writable: true,
    }
);

jest.mock('../../utils/cookie-util', () => {
    const originalModule = jest.requireActual('../../utils/cookie-util');
  
    //Mock the default export and named export 'foo'
    return {
      __esModule: true,
      ...originalModule,
      cookieParser: jest.fn(() => ({
        "loggedIn": "true"
      }))
    };
});
  

beforeEach(() => {
    document.cookie = "loggedIn=;";
});

afterEach(() => {
    jest.resetAllMocks();
});

describe("Header Test", function() {
    it("Should render the logged in header because valid long term session cookies are stored", async function() {
        document.cookie = "loggedIn=true;";
        
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/login/verify`, ({ request, params, cookies }) => {
                return new HttpResponse(null, { status: 201 });
            })
        );
        const { container } = await act(async () => render(<Header />));
        
        await waitFor(async () => {
            let navBar = screen.getByTestId("logged-in-header");
            expect(navBar).toBeDefined();
            expect(navBar).toBeInTheDocument();
        });
    });

    it("Should render the logged out header because there are no cookies and user", async function() {
        const { container } = await act(async () => render(<Header />));
        
        await waitFor(() => {
            let header = screen.getByTestId("logged-out-header");
            expect(header).toBeDefined();
            expect(header).toBeInTheDocument();
        });
    });

    it("Should redirect to signup because sign up tab is clicked", async function() {
        const { container } = await act(async () => render(<Header />));
        
        let signUpButton = screen.getByText("Sign Up");
        act(() => {
            userEvent.click(signUpButton);
        });
        await waitFor(() => {
            expect(replaceMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Should redirect to login because login tab is clicked", async function() {
        const { container } = await act(async () => render(<Header />));

        let loginTab = screen.getByTestId("logged-out-header").children[0];
        act(() => {
            userEvent.click(loginTab);
        });
        waitFor(() => {
            expect(replaceMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Should delete long term login cookies because server returns 401 status code", async function() {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/login/verify`, ({ request, params, cookies }) => {
                return new HttpResponse(null, { status: 401 });
            })
        );

        const { container } = await act(async () => render(<Header />));

        waitFor(() => {
            let navBar = screen.getByTestId("logged-out-header");
            expect(navBar).toBeDefined();
            expect(navBar).toBeInTheDocument();
            let cookies = cookieParser();
            expect(cookies.selector).toBeUndefined();
            expect(cookies.validator).toBeUndefined();
        });
    });

});