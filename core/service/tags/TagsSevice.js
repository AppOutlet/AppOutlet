const tagsRepository = require('../../repository/tags/TagsRepository');

function getTagsByCategory(categoryName) {
    return tagsRepository.category[categoryName]?.tags;
}

module.exports = {
    getTagsByCategory,
};
