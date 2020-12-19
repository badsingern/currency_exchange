import axios from "axios";
import request from "supertest";
import {app} from "../server.js";

describe('Quote Api', () => {
    jest.mock('axios');
    axios.get = jest.fn();

    const thirdPartyApiResponseMockedData = {
        data: {rates: {USD: 1.2259, ILS: 0.90828}, base: "EUR", date: "2020-12-18"}
    };

    const testableApiUrl = process.env.BASE_URL;

    axios.get.mockResolvedValue(thirdPartyApiResponseMockedData);

    it('returns correct response structure and property Types', async () => {
        const {body} = await request(app)
            .get(testableApiUrl)
            .query({base_currency: 'USD', quote_currency: 'ILS', base_amount: 1})
            .expect(200);

        const expectedStructure = expect.objectContaining({
            success: expect.any(Boolean),
            message: {
                exchange_rate: expect.any(Number),
                quote_amount: expect.any(Number)
            }
        });

        expect(body).toEqual(expectedStructure);
    });

    it('returns error message if no base currency parameter provided', async () => {
        const {body: {error}} = await request(app)
            .get(testableApiUrl)
            .query({quote_currency: 'ILS', base_amount: 1})
            .expect(400);

        expect(error).toEqual('"base_currency" is required');
    });

    it('Returns error message if not  supported base currency provided', async () => {
        const {body: {error}} = await request(app)
            .get(testableApiUrl)
            .query({ base_currency: 'CNY', quote_currency: 'ILS', base_amount: 1 })
            .expect(400);

        expect(error).toBe('"base_currency" must be one of [USD, EUR, GBP, ILS]');
    });

    it('Returns error message if not integer base amount provided', async () => {
        const {body: {error}} = await request(app)
            .get(testableApiUrl)
            .query({ base_currency: 'USD', quote_currency: 'ILS', base_amount: 1.454 })
            .expect(400);

        expect(error).toBe('"base_amount" must be an integer');
    });

    it('Returns error message if negative base amount provided', async () => {
        const {body: {error}} = await request(app)
            .get(testableApiUrl)
            .query({ base_currency: 'USD', quote_currency: 'ILS', base_amount: -145 })
            .expect(400);

        expect(error).toBe('"base_amount" must be a positive number');
    });
});
