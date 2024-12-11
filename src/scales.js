import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const Scales = ({ onDropObject, onReturnItem }) => {
    const canvasRef = useRef(null);
    const [placedObject, setPlacedObject] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = 'scales.png';

        const drawScales = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        image.onload = drawScales;
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedData = JSON.parse(event.dataTransfer.getData('application/json'));
        if (droppedData.weight === 0.0) {
            Swal.fire({
                icon: 'warning',
                title: 'Ошибка!',
                text: 'Этот объект нельзя взвесить.',
                confirmButtonText: 'Понятно',
            });
            return;
        }
        setPlacedObject(droppedData);
        onDropObject(droppedData);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragStart = (e) => {
        if (placedObject) {
            e.dataTransfer.setData('application/json', JSON.stringify(placedObject));
        }
    };

    const handleDragEnd = () => {
        setPlacedObject(null);
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <canvas
                ref={canvasRef}
                width={200}
                height={200}
                style={{ cursor: 'pointer', backgroundImage: 'url(scales.png)', backgroundSize: 'cover' }}
            />
            {placedObject && (
                <div
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{
                        position: 'absolute',
                        top: '30px',
                        left: '65px',
                        width: '100px',
                        height: '50px',
                        backgroundColor: '#FFC2D5FF',
                        border: '1px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'grab',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <p>{placedObject.label}</p>
                        <p>{`${placedObject.weight} кг`}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scales;