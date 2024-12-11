import React, { useEffect, useRef } from 'react';

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
                        ctx.fillRect(100, 100, 100, 50);
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 150, 125);
                        ctx.fillText(`${selectedObject.weight} кг`, 150, 145);
                        break;
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(150, 150, 25, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 150, 150);
                        ctx.fillText(`${selectedObject.weight} кг`, 150, 170);
                        break;
                    case 'string':
                        ctx.fillRect(100, 200, 100, 10);
                        ctx.fillStyle = 'white';
                        ctx.fillText(selectedObject.label, 150, 205);
                        ctx.fillText(`${selectedObject.weight} кг`, 150, 225);
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