function to(value) {
    return value ? value.split('|') : null;
}

function from(values) {
    return values ? values.join('|') : null;
}

module.exports = {
    to,
    from,
};
