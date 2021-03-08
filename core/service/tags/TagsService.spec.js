describe('[CORE] Tag service', () => {
    const mockCategories = {
        category: {
            someCategory: {
                name: 'Sample category',
                tags: ['Tag one', 'Tag two'],
            },
        },
    };

    jest.mock('../../repository/tags/TagsRepository', () => mockCategories);

    const tagsService = require('./TagsSevice');

    it('should get tags by category', () => {
        const name = 'someCategory';
        const tags = mockCategories.category.someCategory.tags;

        expect(tagsService.getTagsByCategory(name)).toEqual(tags);
    });

    it('should return null the category does not exists', () => {
        expect(tagsService.getTagsByCategory('Some category')).toBeUndefined();
    });
});
