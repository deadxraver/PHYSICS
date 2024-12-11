function count_h(t) {
    return (window.m0 - window.k * (window.m1 + window.m2)) * window.g * t * t / (2 * (window.m0 + window.m1 + window.m2))
}

function count_T12() {
    return (window.m2 * window.m0 * window.g * (1 + window.k)) / (window.m0 + window.m1 + window.m2);
}
