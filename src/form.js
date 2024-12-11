import React, { useState } from 'react';



function ValidationForm() {
    const [k, setK] = useState('');
    const [T, setT] = useState('');
    const [message, setMessage] = useState('');

    const [kValid, setKValid] = useState(null);
    const [TValid, setTValid] = useState(null);

    // Заданные значения для проверки
    const m0 = window.m0.toFixed(2);
    const m1 = window.m1.toFixed(2);
    const m2 = window.m2.toFixed(2);
    const correctK = window.k.toFixed(2);
    const correctT = (m2 * m0 * window.g * (1 + correctK)) / (m0 + m1 + m2);

    const handleSubmit = (e) => {
        e.preventDefault();

        const epsilon = 0.1;

        const isKValid = Math.abs(parseFloat(k) - correctK) <= epsilon;
        const isTValid = Math.abs(parseFloat(T) - correctT) <= epsilon;

        setKValid(isKValid);
        setTValid(isTValid);

        if (isKValid && isTValid) {
            setMessage('Правильно');
        } else {
            setMessage('Неправильно');
        }
    };

    const getInputStyle = (isValid) => {
        if (isValid === null) return {};
        return {
            borderColor: isValid ? 'green' : 'red'
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id="resultForm">
                <div>
                    <label htmlFor="k">Введите коэффициент трения k: </label>
                    <input
                        type="number"
                        id="k"
                        value={k}
                        onChange={(e) => setK(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div>
                    <label htmlFor="T">Введите силу натяжения нити T: </label>
                    <input
                        type="number"
                        id="T"
                        value={T}
                        onChange={(e) => setT(e.target.value)}
                        required
                    />
                    <br></br>
                    <br></br>
                    <button type="submit" className="check-button">Проверить</button>
                </div>

            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ValidationForm;