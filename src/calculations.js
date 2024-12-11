function count_h() {
    return (window.m0 - window.k * (window.m1 + window.m2)) * window.g * window.t * window.t / (2 * (window.m0 + window.m1 + window.m2))
}

function count_T12() {
    return (window.m2 * window.m0 * window.g * (1 + window.k)) / (window.m0 + window.m1 + window.m2);
}
