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
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        image.onload = () => {
            drawScales();
            if (selectedObject) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                switch (selectedObject.type) {
                    case 'rectangle':
                        ctx.fillRect(90, 90, 100, 50); // Adjusted position
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 140, 115); // Adjusted position
                        ctx.fillText(`${selectedObject.weight} кг`, 140, 135); // Adjusted position
                        break;
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(140, 140, 25, 0, 2 * Math.PI); // Adjusted position
                        ctx.fill();
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 140, 140); // Adjusted position
                        ctx.fillText(`${selectedObject.weight} кг`, 140, 160); // Adjusted position
                        break;
                    case 'string':
                        ctx.fillRect(90, 190, 100, 10); // Adjusted position
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 140, 195); // Adjusted position
                        ctx.fillText(`${selectedObject.weight} кг`, 140, 215); // Adjusted position
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
                // Используем SweetAlert2 для красивого уведомления
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
