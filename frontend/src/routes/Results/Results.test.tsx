import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Results } from './Results';
import userEvent from '@testing-library/user-event';
import { server } from '../../../__mocks__/server';
import { http, HttpResponse } from 'msw';

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
    mockUseLoginStatus.mockReturnValue(true);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Results Route Test", () => {
    const user = userEvent.setup();
    it("Should render only category query chips and remove them when closing them", async () => {
        await act(async () => render(<Results />));
        let categoryDropdown = await waitFor(() => screen.getByTestId("subcategories-multiple-checkbox-select"), {
            timeout: 3000
        });
        expect(categoryDropdown).toBeInTheDocument();

        await user.click(categoryDropdown);

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("subcategories-menu-item"), {
            timeout: 3000,
        });

        await user.click(checkboxItems[0]);
        await user.click(checkboxItems[1]);
        await user.click(checkboxItems[2]);
        await user.click(checkboxItems[3]);
        await user.keyboard("{esc}");
        
        await waitFor(() => {
            expect(screen.getByTestId("Hats & Scarves-chip")).toBeInTheDocument();
            expect(screen.getByTestId("Kids / Baby Footwear-chip")).toBeInTheDocument();
            expect(screen.getByTestId("Men's Footwear-chip")).toBeInTheDocument();
            expect(screen.getByTestId("Women's Apparel-chip")).toBeInTheDocument();
        });
        
        let chipContainer = await screen.findByTestId("chips-container");
        expect(chipContainer.childElementCount).toEqual(4);
        await user.click(chipContainer.children[0].children[1]);
        await user.click(chipContainer.children[0].children[1]);
        await user.click(chipContainer.children[0].children[1]);
        await user.click(chipContainer.children[0].children[1]);

        await waitFor(() => {
            expect(chipContainer.childElementCount).toEqual(0);
        });
    }, 7500);

    it("Should render only state query chips and remove them when closing them", async () => {
        await act(async () => render(<Results />));
        let statesDropdown = await waitFor(() => screen.getByTestId("states-multiple-checkbox-select"), {
            timeout: 3000
        });
        expect(statesDropdown).toBeInTheDocument();

        await user.click(statesDropdown);

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("states-menu-item"), {
            timeout: 3000,
        });
        await user.click(checkboxItems[4]);
        await user.click(checkboxItems[5]);
        await user.keyboard("{esc}")
        
        await waitFor(() => {
            expect(screen.getByTestId("CA-chip")).toBeInTheDocument();
            expect(screen.getByTestId("CO-chip")).toBeInTheDocument();
        });
        
        let chipContainer = await screen.findByTestId("chips-container");
        expect(chipContainer.childElementCount).toEqual(2);
        await user.click(chipContainer.children[0].children[1]);
        await user.click(chipContainer.children[0].children[1]);

        await waitFor(() => {
            expect(chipContainer.childElementCount).toEqual(0);
        });
    }, 7500);
    
    it("Should remove all query chips when clicking clear all button", async () => {
        await act(async () => render(<Results />));
        let categoryDropdown = await waitFor(() => screen.getByTestId("subcategories-multiple-checkbox-select"), {
            timeout: 3000
        });
        let statesDropdown = await waitFor(() => screen.getByTestId("states-multiple-checkbox-select"), {
            timeout: 3000
        });
        expect(categoryDropdown).toBeInTheDocument();
        expect(statesDropdown).toBeInTheDocument();

        await user.click(categoryDropdown);

        let categoryItems = await waitFor(async () => await screen.findAllByTestId("subcategories-menu-item"), {
            timeout: 3000,
        });
        await user.click(categoryItems[0]);
        await user.click(categoryItems[1]);
        await user.click(categoryItems[2]);
        await user.click(categoryItems[3]);
        await user.keyboard("{esc}");
        await user.click(statesDropdown);
        
        let statesItems = await waitFor(async () => await screen.findAllByTestId("states-menu-item"), {
            timeout: 3000,
        });
        await user.click(statesItems[4]);
        await user.click(statesItems[5]);
        await user.keyboard("{esc}")

        await waitFor(() => {
            let chipContainer = screen.getByTestId("chips-container");
            expect(chipContainer.childElementCount).toEqual(6);
            expect(screen.getByTestId("Hats & Scarves-chip")).toBeInTheDocument();
            expect(screen.getByTestId("Kids / Baby Footwear-chip")).toBeInTheDocument();
            expect(screen.getByTestId("Men's Footwear-chip")).toBeInTheDocument();
            expect(screen.getByTestId("Women's Apparel-chip")).toBeInTheDocument();
            expect(screen.getByTestId("CA-chip")).toBeInTheDocument();
            expect(screen.getByTestId("CO-chip")).toBeInTheDocument();
        });

        expect(screen.getByText("Clear All")).toBeInTheDocument();
        await user.click(screen.getByText("Clear All"));

        await waitFor(async () => {
            let chipContainer = await screen.findByTestId("chips-container");
            expect(chipContainer.childElementCount).toEqual(0);
        });
    }, 7500);

    it("Should render you must sign in first in order to access our data modal if user isn't signed up", async () => {
        mockUseLoginStatus.mockReturnValue(false);
        await act(async () => render(<Results />));
        
        await waitFor(() => {
            expect(screen.getByText("Login or Sign up to get full access to our data!")).toBeInTheDocument();
        });
    });

    it("Should not render subcategories dropdown because category doesn't have any subcategories", async () => {
        server.use(
            http.get(process.env.REACT_APP_SERVER_URI + `/vendors/subcategories`, ({ request, params, cookies }) => {
                const subcategories: string[] = [];
                let body = JSON.stringify({
                    result: subcategories
                });
                return new HttpResponse(body, {
                    status: 200
                });
            }),
        );
        await act(async () => render(<Results />));
        await waitFor(() => {
            expect(screen.queryAllByTestId("subcategories-multiple-checkbox-select").length).toEqual(0);
        });
    });
});