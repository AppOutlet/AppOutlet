import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
    it('create an instance', () => {
        const pipe = new MarkdownPipe();
        expect(pipe).toBeTruthy();
    });
});
