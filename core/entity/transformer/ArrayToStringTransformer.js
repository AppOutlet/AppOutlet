function to(values) {
    if (typeof values === 'object') {
        return values;
    }

    return values ? values.join('|') : null;
}

function from(value) {
    return value ? value.split('|') : null;
}

module.exports = {
    to,
    from,
};
