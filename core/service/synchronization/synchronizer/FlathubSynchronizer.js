const { from } = require('rxjs');
const { mergeMap, toArray } = require('rxjs/operators');

const flathubRepository = require('../../../repository/flathub/FlathubRepository');
const applicationRepository = require('../../../repository/application/ApplicationRepository');

function startSynchronization() {
    from(flathubRepository.getApps())
        .pipe(
            mergeMap(from),
            mergeMap(flathubRepository.getAppDetails),
            toArray(),
            mergeMap(applicationRepository.save),
        )
        .subscribe((apps) => {
            console.log(apps);
        });
}

module.exports = {
    startSynchronization,
};
