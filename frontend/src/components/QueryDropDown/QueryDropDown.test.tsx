import { describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryDropDown } from './QueryDropDown';
import userEvent from '@testing-library/user-event';

const data = [
    'subcategory1',
    'subcategory2',
    'subcategory3',
    'subcateogry4',
    'subcategory5',
];

const setSelectedDataMock = jest.fn();
const handleQueryMock = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("QueryDropDown Test", () => {
    const user = userEvent.setup();
    it.skip("Should render all of the data passed to it", async () => {
        render(
            <QueryDropDown 
                name='subcategories'
                data={data}
                selectedData={[]}
                setSelectedData={setSelectedDataMock}
                handleQuery={handleQueryMock}
            />
        );
        await user.click(screen.getByTestId("subcategories-multiple-checkbox-select"));
        expect(screen.getAllByTestId("subcategories-menu-item").length).toEqual(5);
    });
});