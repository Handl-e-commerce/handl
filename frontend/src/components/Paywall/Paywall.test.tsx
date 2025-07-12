import { jest, it, expect, describe, beforeEach, afterEach } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Paywall } from "./Paywall";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


let mockUseLoginStatus = jest.fn();
jest.mock("../../hooks/useLoggedInStatus", () => {
    const originalModule: any = jest.requireActual("../../hooks/useLoggedInStatus");
    return {
        __esModule: true,
        ...originalModule,
        useLoginStatus: jest.fn(() => mockUseLoginStatus()),
    };
});

beforeEach(() => {
    mockUseLoginStatus.mockReturnValue(false);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Paywall tests", () => {
    it("Should render Sign Up now if the user is not logged in", async () => {
        render(
            <MemoryRouter>
                <Paywall />
            </MemoryRouter>
        );

        expect(screen.getByText("Sign Up Today")).toBeInTheDocument();
    })

    it("Should render Go Premium now if the user is logged in", async () => {
        mockUseLoginStatus.mockReturnValue(true);
        render(
            <MemoryRouter>
                <Paywall />
            </MemoryRouter>
        );

        expect(screen.getByText("Go Premium Now")).toBeInTheDocument();
    })
});