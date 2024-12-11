import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const Scales = ({ selectedObject, onPlace, selectedObjectState, setSelectedObject }) => {
    const canvasRef = useRef(null);

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
            if (selectedObject) {
                ctx.fillStyle = 'lightblue';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                switch (selectedObject.type) {
                    case 'rectangle':
                        ctx.fillStyle = 'lightblue';
                        ctx.fillRect(65, 30, 100, 50);
                        ctx.strokeStyle = 'black';
                        ctx.lineWidth = 0.5;
                        ctx.strokeRect(65, 30, 100, 50);
                        ctx.fillStyle = 'black';
                        ctx.fillText(selectedObject.label, 115, 50);
                        ctx.fillText(`${selectedObject.weight} кг`, 115, 65);
                        break;
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(100, 100, 25, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 100, 100);
                        ctx.fillText(`${selectedObject.weight} кг`, 100, 120);
                        break;
                    case 'string':
                        ctx.fillRect(50, 150, 100, 10);
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 100, 155);
                        ctx.fillText(`${selectedObject.weight} кг`, 100, 175);
                        break;
                    default:
                        break;
                }
            }
        };

        if (!selectedObject) {
            drawScales();
        }
    }, [selectedObject]);

    const handlePlaceOnScales = () => {
        if (selectedObjectState) {
            if (selectedObjectState.weight === 0.0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ошибка!',
                    text: 'Этот объект нельзя взвесить.',
                    confirmButtonText: 'Понятно',
                });
                return;
            }
            onPlace(selectedObjectState);
            setSelectedObject(null);
        } else {
            onPlace(null);
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
            <canvas
                ref={canvasRef}
                width={200}
                height={200}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default Scales;