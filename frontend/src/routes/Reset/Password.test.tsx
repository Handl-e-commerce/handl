import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Password } from './Password';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';

describe("Password tests", () => {
    
});