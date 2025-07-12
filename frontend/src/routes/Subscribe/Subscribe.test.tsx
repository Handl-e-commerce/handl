import { Subscribe } from "./Subscribe";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

const mockLoginStatus = jest.fn();
jest.mock("../../hooks/useLoggedInStatus", () => {
    const originalModule = jest.requireActual("../../hooks/useLoggedInStatus");
    return {
        __esModule: true,
        ...originalModule,
        useLoginStatus: jest.fn(() => mockLoginStatus()),
    };
});

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

beforeEach(() => {
    mockLoginStatus.mockReturnValue(true);
});

afterEach(() => {
    jest.clearAllMocks();
});
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Subscribe Route Tests", () => {
    const user = userEvent.setup();
    it("Should navigate to pricing page if user is not logged in", async () => {
        mockLoginStatus.mockReturnValue(false);
        await act(async () => render(
            <MemoryRouter>
                <Subscribe />
            </MemoryRouter>
        ));

        expect(mockNavigate).toHaveBeenCalledWith('/pricing');
    });

    it("Should navigate to pricing page if subroute is not success or cancel", async () => {
        await act(async () => render(
            <MemoryRouter initialEntries={['/subscribe/foo']}>
                <Routes>
                    <Route path="/subscribe/:status" element={<Subscribe />} />
                </Routes>
            </MemoryRouter>
        ));

        expect(mockNavigate).toHaveBeenCalledWith('/pricing');
    });

    it("Should render success page with confirmation message", async () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: "firstName=MockFirstName",
        });
        await act(async () => render(
            <MemoryRouter initialEntries={['/subscribe/success']}>
                <Routes>
                    <Route path="/subscribe/:status" element={<Subscribe />} />
                </Routes>
            </MemoryRouter>
        ));

        expect(screen.getByText(/Thanks MockFirstName!/i)).toBeInTheDocument();
        expect(screen.getByText(/Your subscription is now active and you have full access to all of our data./i)).toBeInTheDocument();
        await user.click(screen.getByText(/go to home/i));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it("Should render cancel page with cancellation message", async () => {
        await act(async () => render(
            <MemoryRouter initialEntries={['/subscribe/cancel']}>
                <Routes>
                    <Route path="/subscribe/:status" element={<Subscribe />} />
                </Routes>
            </MemoryRouter>
        ));

        expect(screen.getByText(/Checkout Failed/i)).toBeInTheDocument();
        const tryAgainButton = screen.getByRole('button', { name: /Try Again/i });
        expect(tryAgainButton).toBeInTheDocument();
        await user.click(tryAgainButton);
        await waitFor(() => {
            expect(window.location.href).toEqual("https://stripe-checkout-url.com");
        });
    });
})