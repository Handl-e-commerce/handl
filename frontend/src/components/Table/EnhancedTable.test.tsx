import { describe, expect, it } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EnhancedTable } from './EnhancedTable';
import { Vendor } from '../../types/types';
import userEvent from '@testing-library/user-event';

const mockData: Vendor[] = [
    {
        uuid: "randomUuid1",
        name: "Foobaroni Associates",
        description: "Classified",
        website: "foobaroniasc.com",
        categories: "Category1, Category2",
        people: ["Tony Soprano"],
        address: "Random Address",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11111",
        phoneNumber: "(555) 555-5555",
        email: "tsoprano@foobaroni.com",
    },
    {
        uuid: "randomUuid2",
        name: "Mock Name",
        description: "Mock description",
        website: "mockwebsite.com",
        categories: "Category1, Category4, Category5",
        people: ["Mock Person, Mock Person2"],
        address: "Mock Address",
        city: "Mock City",
        state: "MO",
        zipcode: "45289",
        phoneNumber: "(718) 998-1919",
        email: "mock@email.com",
    },
    {
        uuid: "randomUuid3",
        name: "Mock Name2",
        description: "Mock description 2",
        website: "mockwebsite2.com",
        categories: "Category2, Category3",
        people: ["Mock Person3"],
        address: "2 Mock Address",
        city: "Mock City 2",
        state: "NV",
        zipcode: "45289",
        phoneNumber: "(917) 430-2023",
        email: "mock2@email.com",
    },

];

global.fetch = jest.fn();

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

describe("EnhancedTable Tests", () => {
    it("Should update favorites when clicking on favorite icon button for vendor", async () => {
        render(<EnhancedTable isMobile={false} loadingData={false} data={mockData}/>)

        await userEvent.click(screen.getAllByLabelText("icon-button-favorite")[1]);
        expect(screen.getAllByTestId("FavoriteIcon").length).toEqual(2);
        await userEvent.click(screen.getAllByLabelText("icon-button-favorite")[0]);
        expect(screen.getAllByTestId("FavoriteIcon").length).toEqual(1);
    });

    it("Should render data as expected for logged in user", async () => {
        render(<EnhancedTable isMobile={false} loadingData={false} data={mockData}/>)
        for (let i = 0; i < mockData.length; i++) {
            expect(screen.getByText(mockData[i].name)).toBeInTheDocument();
            expect(screen.getByText(mockData[i].website)).toBeInTheDocument();
            expect(screen.getByText(mockData[i].phoneNumber)).toBeInTheDocument();
            expect(screen.getByText(mockData[i].state)).toBeInTheDocument();
        };
        
        await waitFor(() => {
            expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
            expect(screen.getAllByTestId("FavoriteBorderIcon").length).toEqual(2);
        });
    });

    it("Should expand the row upon clicking the expansion icon", async () => {
        render(<EnhancedTable isMobile={false} loadingData={false} data={mockData}/>);
        await userEvent.click(screen.getAllByLabelText("expand row")[0]);
        await waitFor(() => {
            expect(screen.getByText(mockData[0].description)).toBeInTheDocument();
            expect(screen.getByText(mockData[0].people[0])).toBeInTheDocument();
            expect(screen.getByText(mockData[0].email)).toBeInTheDocument();
            expect(screen.getByTestId("google-maps-link")).toBeInTheDocument();
            expect(screen.getByText("Category1")).toBeInTheDocument();
            expect(screen.getByText("Category2")).toBeInTheDocument();
        });
    });

    it("Should not render favorite icon button for non-logged in user", async () => {
        mockUseLoginStatus.mockReturnValueOnce(false);
        await act(async () => render(<EnhancedTable isMobile={false} loadingData={false} data={mockData}/>));

        expect(screen.queryByTestId("FavoriteIcon")).toBeNull();
    });
});