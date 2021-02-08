function to(value) {
    return value ? value.getTime() : null;
}

function from(value) {
    return value ? new Date(value) : null;
}

module.exports = {
    to,
    from,
};
