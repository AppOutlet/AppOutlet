import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
    const pipe = new MarkdownPipe();
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return undefined if we pass undefined', () => {
        expect(pipe.transform(undefined)).toBeUndefined();
    });

    it('should return empty string if we pass empty string', () => {
        expect(pipe.transform('')).toEqual('');
    });

    it('should transform markdown to html', () => {
        expect(pipe.transform('# app-outlet')).toEqual(
            '<h1 id="app-outlet">app-outlet</h1>\n',
        );
    });
});
