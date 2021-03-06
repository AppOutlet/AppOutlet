describe('[CORE] Tag service', () => {
    const mockCategories = {
        category: [
            {
                name: 'Sample category',
                tags: ['Tag one', 'Tag two'],
            },
        ],
    };

    jest.mock('../../repository/tags/TagsRepository', () => mockCategories);

    const tagsService = require('./TagsSevice');

    it('should get tags by category', () => {
        const name = mockCategories.category[0].name;
        const tags = mockCategories.category[0].tags;

        expect(tagsService.getTagsByCategory(name)).toEqual(tags);
    });

    it('should return null the category does not exists', () => {
        expect(tagsService.getTagsByCategory('Some category')).toBeUndefined();
    });
});
