const arrayToStringTransformer = require('./ArrayToStringTransformer');

describe('Array to string transformer', () => {
    it('should transform string to string array', () => {
        expect(arrayToStringTransformer.from('a|b|c')).toEqual(['a', 'b', 'c']);
    });

    it('should transform string array to string ', () => {
        expect(arrayToStringTransformer.to(['a', 'b', 'c'])).toEqual('a|b|c');
    });

    it('should return null if the entry of any functions is null or undefined ', () => {
        expect(arrayToStringTransformer.to(null)).toBeNull();
        expect(arrayToStringTransformer.to(undefined)).toBeNull();
        expect(arrayToStringTransformer.from(null)).toBeNull();
        expect(arrayToStringTransformer.from(undefined)).toBeNull();
    });
});
