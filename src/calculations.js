

export function count_h(t) {
    // console.log(m0, m1, m2, )
    let res =  (window.m0 - window.k * (window.m1 + window.m2)) * window.g * t * t / (2 * (window.m0 + window.m1 + window.m2))
    console.log('посчитали h', res);
    console.log(t);

    return res
}

export function count_T12() {
    return (window.m2 * window.m0 * window.g * (1 + window.k)) / (window.m0 + window.m1 + window.m2);
}
