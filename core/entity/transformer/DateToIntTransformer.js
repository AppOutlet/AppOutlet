function to() {
    return value ? value.getTime() : null;
}

function from() {
    return value ? new Date(value) : null;
}

module.exports = {
    to,
    from,
};
