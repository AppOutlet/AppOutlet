import * as tagsRepository from '../../../core/repository/tags/TagsRepository';

export const routes = {
    category: {
        office: `/category/${tagsRepository.category.office.name}`,
        internet: `/category/${tagsRepository.category.internet.name}`,
        audio: `/category/${tagsRepository.category.audio.name}`,
        video: `/category/${tagsRepository.category.video.name}`,
        games: `/category/${tagsRepository.category.games.name}`,
        development: `/category/${tagsRepository.category.development.name}`,
        finance: `/category/${tagsRepository.category.finance.name}`,
        graphics: `/category/${tagsRepository.category.graphics.name}`,
        science: `/category/${tagsRepository.category.science.name}`,
        utility: `/category/${tagsRepository.category.utility.name}`,
        misc: `/category/${tagsRepository.category.misc.name}`,
    },
};
