import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Results } from './Results';

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

describe("Results Route Test", () => {
    it("Should render only results that match search params", async () => {
        const { container } = await act( async () => render(<Results />));
    });

    it("Should render only results that match filter values", async () => {
        const { container } = await act( async () => render(<Results />));
    });

    it("Should render only results that match both search params and filter values", async () => {
        const { container } = await act( async () => render(<Results />));
    });

    it("Sort functionality should sort by ascending and descending orders and be able to go back to normal", async () => {
        const { container } = await act( async () => render(<Results />));
    });

    it("Should render you must sign in first in order to access our data modal if user isn't signed up", async () => {
        const { container } = await act( async () => render(<Results />));

        expect(screen.getByText("Login or Sign up to get full access to our data!")).toBeInTheDocument();
    });
});