import React from 'react';

const InventoryItem = ({ type, label, weight, onSelect }) => {
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
    const items = [
        { type: 'rectangle', label: 'm0', weight: 1.0 },
        { type: 'rectangle', label: 'm1', weight: 1.5 },
        { type: 'rectangle', label: 'm2', weight: 2.0 },
        { type: 'string', label: 'Нить', weight: 0.1 },
        { type: 'circle', label: 'Блок', weight: 0.5 },
    ];

    return (
        <div style={{ border: '1px solid black', padding: '10px', width: '150px' }}>
            <h3>Инвентарь</h3>
            {items.map((item, index) => (
                <InventoryItem
                    key={index}
                    type={item.type}
                    label={item.label}
                    weight={item.weight}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default Inventory;