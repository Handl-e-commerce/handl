import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { mockSearchParams } from '../../utils/mock-search-params-util';

describe("Header Tests", () => {
    it("Blank test for scaffholding purposes", () => {

    });
});