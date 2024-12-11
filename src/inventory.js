import React, { useState } from 'react';

const InventoryItem = ({ name, weight, onSelect }) => {
    return (
        <div
            style={{
                margin: '10px',
                padding: '10px',
                border: '1px solid black',
                cursor: 'pointer',
            }}
            onClick={() => onSelect({ name, weight })}
        >
            <p>Объект: {name}</p>
            <p>Вес: {weight} кг</p>
        </div>
    );
};

const Inventory = ({ onSelect }) => {
    const [items] = useState([
        { name: 'Книга', weight: 1.5 },
        { name: 'Телефон', weight: 0.2 },
        { name: 'Ноутбук', weight: 2.5 },
    ]);

    return (
        <div>
            <h3>Инвентарь</h3>
            {items.map((item, index) => (
                <InventoryItem
                    key={index}
                    name={item.name}
                    weight={item.weight}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default Inventory;