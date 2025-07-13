import { Pricing } from "./Pricing";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

let mockUseLoginStatus = jest.fn();
jest.mock("../../hooks/useLoggedInStatus", () => {
    const originalModule = jest.requireActual("../../hooks/useLoggedInStatus");
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

describe("Pricing Route Tests", () => {
    it("Should render sign up now button when user is not logged in", async () => {
        await act(async () => render(
            <MemoryRouter>
                <Pricing />
            </MemoryRouter>
        ));

        expect(screen.getByText("Sign Up Today")).toBeInTheDocument();
    });

    it("Should render go premium now button when user is logged in and plan type is not premium", async () => {
        mockUseLoginStatus.mockReturnValue(true);
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: "planType=Free",
        });
        await act(async () => render(
            <MemoryRouter>
                <Pricing />
            </MemoryRouter>
        ));

        expect(screen.getByText("Go Premium Now")).toBeInTheDocument();
    });
});
