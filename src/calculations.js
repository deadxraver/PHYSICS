const m0 = window.m0.toFixed(2);
const m1 = window.m1.toFixed(2);
const m2 = window.m2.toFixed(2);

function count_h(t) {
    return (m0 - window.k * (m1 + m2)) * window.g * t * t / (2 * (m0 + m1 + m2))
}

function count_T12() {
    return (m2 * m0 * window.g * (1 + window.k)) / (m0 + m1 + m2);
}
