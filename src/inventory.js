import React, { useState } from 'react';

const Inventory = ({ onDragStart, onReturnItem,  onItemClick }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [draggingItem, setDraggingItem] = useState(null);
    const [items, setItems] = useState([
        { type: 'rectangle', label: 'm0', weight: window.m0.toFixed(2) },
        { type: 'rectangle', label: 'm1', weight: window.m1.toFixed(2) },
        { type: 'rectangle', label: 'm2', weight: window.m2.toFixed(2) },
        { type: 'string', label: 'Нить', weight: 0.0 },
        { type: 'circle', label: 'Блок', weight: 0.0 },
        { type: 'linear', label: 'Линейка', weight: 0.0 },
    ]);

    const handleHover = (label) => {
        const selectedItem = getSelectedItem(items, label);
        console.log(selectedItem); // Для отладки
    };




    const handleMouseEnter = (label) => {setHoveredItem(label); handleHover(label)}
    const handleMouseLeave = () => {setHoveredItem(null);};

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
            width: type === 'circle' ?  '100px' : '120px',
            height: type === 'rectangle' ? '55px' : type === 'circle' ? '100px' : '0.1px',
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            backgroundImage:  label === 'Нить' ? 'url(resources/нитка.jpg)' :
                label === 'm0' ? 'url(resources/weight_before.jpg)' :
                    label === 'Блок' ? 'url(resources/колесо.png)' : label === 'Линейка' ? 'url(resources/линейка.jpg)'
                                : 'url(resources/телега.jpg)',
            backgroundSize: label === 'Блок' ? '100% 100%': label === 'Линейка'? '100% 100%': label === 'Нить'? '100% 100%':'100% 110%',
            cursor: 'grab',
            fontSize: 'normal',
            display: 'flex',
            fontWeight: 'bold',
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
            position: 'relative',
        };
        return baseStyles;
    };

    return (
        <div
            style={{ border: '1px solid black', padding: '10px', width: '160px', backgroundColor: '#f6cddb', textAlign: 'center'}}
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
                    style={{ margin: '10px', textAlign: 'center' }}
                    draggable
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onItemClick(item)}
                >
                    <div style={getItemStyle(item.type, item.label)}>
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            textAlign: 'center',
                            padding: '2px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'auto',
                        }}>
                            <p style={{ margin: '0' }}>{item.label}</p>
                        </div>
                    </div>
                </div>
            ))}
            <h5>Чтобы измерить смещение тележек, нажмите сначала на линейку, а затем - на пройденный тележками путь</h5>
        </div>
    );
};


export const getSelectedItem = (items, label) => {
    const filteredItems = items.filter(item => item.label === label);
    return filteredItems.length > 0 ? filteredItems[0] : null;
};
export default Inventory;