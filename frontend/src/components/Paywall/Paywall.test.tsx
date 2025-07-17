import { jest, it, expect, describe, beforeEach, afterEach } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { Paywall } from "./Paywall";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";


let mockUseLoginStatus = jest.fn();
jest.mock("../../hooks/useLoggedInStatus", () => {
    const originalModule: any = jest.requireActual("../../hooks/useLoggedInStatus");
    return {
        __esModule: true,
        ...originalModule,
        useLoginStatus: jest.fn(() => mockUseLoginStatus()),
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

describe("Paywall tests", () => {
    const user = userEvent.setup();
    it("Should render Sign Up now if the user is not logged in", async () => {
        render(
            <MemoryRouter>
                <Paywall />
            </MemoryRouter>
        );

        expect(screen.getByText("Sign Up Today")).toBeInTheDocument();
        await user.click(screen.getByText("Sign Up Today"));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/sign-up");
        });
    })

    it("Should render Go Premium now if the user is logged in", async () => {
        mockUseLoginStatus.mockReturnValue(true);
        render(
            <MemoryRouter>
                <Paywall />
            </MemoryRouter>
        );

        expect(screen.getByText("Go Premium Now")).toBeInTheDocument();
        await user.click(screen.getByText("Go Premium Now"));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/pricing");
        });
    })
});