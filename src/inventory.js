import React, { useState } from 'react';

const InventoryItem = ({ type, label, weight, onSelect, isSelected }) => {
    const styles = {
        rectangle: {
            width: '100px',
            height: '50px',
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isSelected ? 'lightblue' : 'white',
        },
        circle: {
            width: '50px',
            height: '50px',
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isSelected ? 'lightblue' : 'white',
        },
        string: {
            width: '100px',
            height: '10px',
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isSelected ? 'lightblue' : 'white',
        }
    };

    return (
        <div
            style={styles[type]}
            onClick={() => onSelect({ type, label, weight })}
        >
            <p>{label}</p>
        </div>
    );
};

const Inventory = ({ onSelect }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        if (selectedItem && selectedItem.label === item.label) {
            setSelectedItem(null);
            onSelect(null);
        } else {
            setSelectedItem(item);
            onSelect(item);
        }
    };

    const items = [
        { type: 'rectangle', label: 'm0', weight: 1.0 },
        { type: 'rectangle', label: 'm1', weight: 1.5 },
        { type: 'rectangle', label: 'm2', weight: 2.0 },
        { type: 'string', label: 'Нить', weight: 0.0 },
        { type: 'circle', label: 'Блок', weight: 0.0 },
    ];

    return (
        <div style={{ border: '1px solid black', padding: '10px', width: '150px' }}>
            <h3>Инвентарь</h3>
            <h5>Нажмите, чтобы выбрать объект</h5>
            <h5>После выбора объекта нажмите на весы, чтобы узнать его массу</h5>
            {items.map((item, index) => (
                <InventoryItem
                    key={index}
                    type={item.type}
                    label={item.label}
                    weight={item.weight}
                    onSelect={handleSelect}
                    isSelected={selectedItem && selectedItem.label === item.label}
                />
            ))}
        </div>
    );
};

export default Inventory;