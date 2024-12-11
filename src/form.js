import React, { useState } from 'react';



function ValidationForm() {
    const [k, setK] = useState('');
    const [T, setT] = useState('');
    const [message, setMessage] = useState('');

    const [kValid, setKValid] = useState(null); // null, true, or false
    const [TValid, setTValid] = useState(null); // null, true, or false

    // Заданные значения для проверки
    const correctK = 5; // TODO это должно задаться рандомно в начале
    const correctT = 10; // TODO это по формулку считаться
    // T = ( m_2 * m_0 * g * (1 + k) ) / (m_0 + m_1 + m_2)

    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        const isKValid = parseFloat(k) === correctK;
        const isTValid = parseFloat(T) === correctT;

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