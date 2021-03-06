const tagsRepository = require('../../repository/tags/TagsRepository');

function getTagsByCategory(categoryName) {
    return tagsRepository.category.find(
        (category) => category.name === categoryName,
    )?.tags;
}

module.exports = {
    getTagsByCategory,
};
