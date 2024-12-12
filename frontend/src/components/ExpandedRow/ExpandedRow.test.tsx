import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ExpandedRow } from './ExpandedRow';
import { Vendor } from '../../types/types';

const row: Vendor = {
    uuid: 'randomUUID',
    name: 'Mock Name',
    description: 'Mock Description',
    website: 'https://mockwebsite.com',
    categories: 'Category 1, Category 2, Category 3',
    people: ['Tony Soprano', 'Paulie Walnuts', ],
    address: 'Bada Bing',
    city: 'Newark',
    state: 'NJ',
    zipcode: '45500',
    phoneNumber: '555-555-5555',
    email: 'tony@wastemanagement.com',
}

describe("QueryDropDown Test", () => {
    it("Should render the row data for a fully hydrated row", () => {
        render(<ExpandedRow row={row} isMobile={false} />);
        expect(screen.getByText("Mock Name")).toBeInTheDocument();
        expect(screen.getByText("Tony Soprano")).toBeInTheDocument();
        expect(screen.getByText("Mock Description")).toBeInTheDocument();
        expect(screen.getByText(/mockwebsite.com/i)).toBeInTheDocument();
        expect(screen.getByText("Category 1")).toBeInTheDocument();
        expect(screen.getByText(/Bada Bing/i)).toBeInTheDocument();
        expect(screen.getByText("555-555-5555")).toBeInTheDocument();
        expect(screen.getByTestId("google-maps-link")).toBeInTheDocument();
    });

    it("Should not render the address link since it's missing", () => {
        row.address = "";
        row.city = "";
        row.state = "";
        row.zipcode = "";
        render(<ExpandedRow row={row} isMobile={false} />);
        expect(screen.queryByTestId("link")).toBeNull();
    });
});