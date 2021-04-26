function to(values) {
    if (Array.isArray(values)) {
        return values ? values.join('|') : null;
    } else {
        return values ?? null;
    }
}

function from(value) {
    return value ? value.split('|') : null;
}

module.exports = {
    to,
    from,
};
