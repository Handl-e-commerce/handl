import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

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

let mockUseLoginStatus = jest.fn();
jest.mock("../../hooks/useLoggedInStatus", () => {
    const originalModule = jest.requireActual("../../hooks/useLoggedInStatus");
    return {
        __esModule: true,
        ...originalModule,
        useLoginStatus: jest.fn(() => mockUseLoginStatus()),
    };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockNavigate,
}));


beforeEach(() => {
    mockUseLoginStatus.mockReturnValue(false);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Header Test", function() {
    const user = userEvent.setup();
    it("Should render the logged in header because valid long term session cookies are stored", async function() {
        mockUseLoginStatus.mockReturnValue(true);
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: "firstName=MockFirstName",
        });
        await act(async () => render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ));
        
        await waitFor(async () => {
            let navBar = screen.getByTestId("header");
            expect(navBar).toBeDefined();
            expect(navBar).toBeInTheDocument();
            expect(screen.getByText("Saved Vendors")).toBeInTheDocument();
            expect(screen.getByText(/hi, mockfirstname/i)).toBeInTheDocument();
        });
    });

    it("Should render the logged out header because there are no cookies and user", async function() {
        await act(async () => render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ));

        await waitFor(() => {
            let header = screen.getByTestId("header");
            expect(header).toBeDefined();
            expect(header).toBeInTheDocument();
            expect(screen.queryByText("Saved Vendors")).toBeNull();
            expect(screen.getByText(/Login/i)).toBeInTheDocument();
            expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
        });
    });

    it("Should redirect to signup because sign up tab is clicked", async function() {
        await act(async () => render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ));
        
        let signUpButton = screen.getByText("Sign Up");
        await user.click(signUpButton);
        await waitFor(() => {
            expect(replaceMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Should redirect to login because login tab is clicked", async function() {
        await act(async () => render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ));

        let loginTab = screen.getByTestId("header").children[0];
        await user.click(loginTab);
        waitFor(() => {
            expect(replaceMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Should delete long term login cookies because server returns 401 status code", async function() {
        await act(async () => render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ));

        waitFor(() => {
            let navBar = screen.getByTestId("header");
            expect(navBar).toBeDefined();
            expect(navBar).toBeInTheDocument();
        });
    });

    it("Should render upgrade to premium because user is not premium", async () => {
        mockUseLoginStatus.mockReturnValue(true);
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: "firstName=MockFirstName; planType=Free;",
        });
        await act(async () => render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ));
        await user.click(screen.getByText(/hi, mockfirstname/i));
        await waitFor(() => {
            expect(screen.getByText("Upgrade to Premium!")).toBeInTheDocument();
        });
        await user.click(screen.getByText("Upgrade to Premium!"));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/pricing");
        });
    });
});