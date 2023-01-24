import { beforeEach } from "node:test";
import { seed } from "../db/seeds/run-seed";
import { _db } from "../db/connection";

beforeEach(() => {
    return seed(_db)
})

describe('Name of the group', () => {
    it('should ', () => {
        expect(1).toBe(1)
    });
});