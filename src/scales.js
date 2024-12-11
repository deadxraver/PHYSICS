import React from 'react';

const Scales = ({ selectedObject, onPlace, selectedObjectState, setSelectedObject }) => {
    const imageStyle = {
        width: '200px',
        height: '200px',
        cursor: 'pointer',
        position: 'relative',
    };

    const overlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
    };

    const handlePlaceOnScales = () => {
        if (selectedObjectState) {
            onPlace(selectedObjectState);
            setSelectedObject(null);
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
            onClick={handlePlaceOnScales}
        >
            <img
                src="scales.png"
                alt="Весы"
                style={imageStyle}
            />
            <div style={overlayStyle}>
                {selectedObject ? (
                    <>
                        <p>Объект: {selectedObject.label}</p>
                        <p>Вес: {selectedObject.weight} кг</p>
                    </>
                ) : (
                    <p>Кликните, чтобы положить объект</p>
                )}
            </div>
        </div>
    );
};

export default Scales;