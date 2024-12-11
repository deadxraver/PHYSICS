import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const Scales = ({ onDropObject }) => {
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

        image.onload = () => {
            drawScales();
            if (placedObject) {
                ctx.fillStyle = '#FFC2D5FF';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                switch (placedObject.type) {
                    case 'rectangle':
                        ctx.fillRect(65, 30, 100, 50);
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 0.5;
                        ctx.strokeRect(65, 30, 100, 50);
                        ctx.fillStyle = 'black';
                        ctx.fillText(placedObject.label, 115, 50);
                        ctx.fillText(`${placedObject.weight} кг`, 115, 65);
                        break;
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(100, 100, 25, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.fillStyle = 'white';
                        ctx.fillText(placedObject.label, 100, 100);
                        ctx.fillText(`${placedObject.weight} кг`, 100, 120);
                        break;
                    case 'string':
                        ctx.fillRect(50, 150, 100, 10);
                        ctx.fillStyle = 'white';
                        ctx.fillText(placedObject.label, 100, 155);
                        ctx.fillText(`${placedObject.weight} кг`, 100, 175);
                        break;
                    default:
                        break;
                }
            }
        };

        drawScales();
    }, [placedObject]);

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

    const handleCanvasClick = () => {
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
                style={{ cursor: 'pointer', border: '1px solid black' }}
                onClick={handleCanvasClick}
            />
        </div>
    );
};

export default Scales;
