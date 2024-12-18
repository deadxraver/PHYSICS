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
                text: 'Этот объект невесомый.',
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
                textAlign: 'center',
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
                        left: '55px',
                        width: placedObject.type === 'circle' ?  '100px' : placedObject.label === 'm0' ? '80px' : '120px',
                        fontWeight: 'bold',
                        fontSize: 'larger',
                        height: '55px',
                        border: '1px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'grab',
                        backgroundImage: `url(${placedObject.label === 'm0' ? 'resources/weight_v_momente.jpg' : 'resources/телега.jpg'})`,
                        backgroundSize: '100%',
                    }}
                >
                    <div style={{ textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.59)', maxHeight: '100%', width: '100%' }}>
                        <p>{`${placedObject.weight} кг`}</p>
                    </div>
                </div>
            )}
            <div style={{ marginLeft:"-40px", marginTop: "-10px", fontWeight: 'bold' }}>Весы</div>
        </div>
    );
};

export default Scales;