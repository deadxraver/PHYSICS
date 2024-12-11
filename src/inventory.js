import React, { useState } from 'react';

const Inventory = ({ onDragStart, onReturnItem }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [draggingItem, setDraggingItem] = useState(null);
    const [items, setItems] = useState([
        { type: 'rectangle', label: 'm0', weight: window.m0.toFixed(2) },
        { type: 'rectangle', label: 'm1', weight: window.m1.toFixed(2) },
        { type: 'rectangle', label: 'm2', weight: window.m2.toFixed(2) },
        { type: 'string', label: 'Нить', weight: 0.0 },
        { type: 'circle', label: 'Блок', weight: 0.0 },
    ]);

    const handleMouseEnter = (label) => setHoveredItem(label);
    const handleMouseLeave = () => setHoveredItem(null);

    const handleDragStart = (e, item) => {
        if (e.dataTransfer) {
            e.dataTransfer.setData('application/json', JSON.stringify(item));
            setDraggingItem(item.label);
            if (onDragStart) onDragStart(e, item);
        } else {
            console.error('DragStart event missing dataTransfer');
        }
    };

    const handleDragEnd = () => setDraggingItem(null);

    const handleItemDrop = (item) => {
        setItems((prevItems) => prevItems.filter((i) => i.label !== item.label));
    };

    const returnItemToInventory = (item) => {
        setItems((prevItems) => {
            const itemExists = prevItems.some((i) => i.label === item.label);
            if (!itemExists) {
                return [...prevItems, item];
            }
            return prevItems;
        });
    };

    const getItemStyle = (type, label) => {
        const isHovered = label === hoveredItem;
        const isDragging = label === draggingItem;
        const baseStyles = {
            width: type === 'rectangle' ? '100px' : type === 'circle' ? '50px' : '100px',
            height: type === 'rectangle' ? '50px' : type === 'circle' ? '50px' : '0.1px',
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragging
                ? '#FFC2D5FF'
                : isHovered
                    ? '#FFC2D5FF'
                    : 'white',
            boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
            borderRadius: type === 'circle' ? '50%' : '0',
            transition: 'background-color 0.2s, box-shadow 0.2s',
        };
        return baseStyles;
    };

    return (
        <div
            style={{ border: '1px solid black', padding: '10px', width: '150px', backgroundColor: 'lavenderblush' }}
            onDrop={(e) => {
                e.preventDefault();
                try {
                    const droppedData = JSON.parse(e.dataTransfer.getData('application/json'));
                    if (droppedData && onReturnItem) {
                        onReturnItem(droppedData);
                        returnItemToInventory(droppedData);
                    }
                } catch (error) {
                    console.error('Error parsing dropped data', error);
                }
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            <h3>Инвентарь</h3>
            <h5>Перетащите объект на весы</h5>
            {items.map((item, index) => (
                <div
                    key={index}
                    style={getItemStyle(item.type, item.label)}
                    draggable
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                >
                    <p>{item.label}</p>
                </div>
            ))}
        </div>
    );
};

export default Inventory;