import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Results } from './Results';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';

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

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

beforeEach(() => {
    server.use(
        http.post(REACT_APP_SERVER_URI + `/users/login/verify`, ({ request, params, cookies }) => {
            return new HttpResponse(null, { status: 201 });
        })
    );
});

describe("Results Route Test", () => {
    it("Should render only category query chips and remove them when closing them", async () => {
        const { container } = await act( async () => render(<Results />));
        let dropdown = await waitFor(() => screen.getByTestId("categories-multiple-checkbox-select"), {
            timeout: 3000
        });
        expect(dropdown).toBeInTheDocument();

        act(() => {
            userEvent.click(dropdown);
        });

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("menu-item"), {
            timeout: 3000,
        });
                
        act(() => {
            userEvent.click(checkboxItems[0]);
            userEvent.click(checkboxItems[1]);
            userEvent.click(checkboxItems[2]);
            userEvent.click(checkboxItems[3]);
            userEvent.keyboard("{esc}")
        });
        
        await waitFor(() => {
            expect(screen.getByText("Fashion Jewelry / Watches")).toBeInTheDocument();
            expect(screen.getByText("Handbags")).toBeInTheDocument();
            expect(screen.getByText("Hats / Scarves")).toBeInTheDocument();
            expect(screen.getByText("Small Leather Goods (Belts/Wallets/etc)")).toBeInTheDocument();
        });
        
        let chipContainer = await screen.findByTestId("chips-container");
        expect(chipContainer.childElementCount).toEqual(4);

        act(() => {
            userEvent.click(chipContainer.children[0].children[1]);
            userEvent.click(chipContainer.children[1].children[1]);
        });

        await waitFor(() => {
            expect(chipContainer.childElementCount).toEqual(2);
        })
    });
    

    it("Should render you must sign in first in order to access our data modal if user isn't signed up", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/login/verify`, ({ request, params, cookies }) => {
                return new HttpResponse(null, {
                    status: 401
                });
            }),
        );
        const { container } = await act( async () => render(<Results />));
        
        await waitFor(() => {
            expect(screen.getByText("Login or Sign up to get full access to our data!")).toBeInTheDocument();
        });
    });
});