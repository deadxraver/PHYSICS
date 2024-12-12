import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { useTimer } from './timer';
import PhysicsVisualization from "./visualization/drawer";
import Scales from "./scales";
import Inventory from "./inventory";
import Form from "./form";
import Matter from 'matter-js';
import Swal from "sweetalert2";
import {count_h} from './calculations'

function ScalesComponent() {
	const [selectedObject, setSelectedObject] = useState(null);
	const [objectOnScales, setObjectOnScales] = useState(null);

	const handleSelect = (item) => {
		if (item && selectedObject && selectedObject.label === item.label) {
			setObjectOnScales(null);
			setSelectedObject(null);
		} else {
			setSelectedObject(item);
			setObjectOnScales(null);
		}
	};

	const handleDragStart = (event, item) => {
		if (event.dataTransfer) {
			event.dataTransfer.setData('application/json', JSON.stringify(item));
		} else {
			console.error('DragStart event missing dataTransfer');
		}
	};

	const handleDrop = (event) => {
		if (event.preventDefault) event.preventDefault();
		if (event.dataTransfer) {
			try {
				const data = event.dataTransfer.getData('application/json');
				const droppedObject = JSON.parse(data);
				setObjectOnScales(droppedObject);
			} catch (error) {
				console.error('Failed to handle drop event:', error);
			}
		}
	};

	const handleDragOver = (event) => {
		if (event.preventDefault) event.preventDefault();
	};

	const handleItemClick = (item) => {
		console.log('Clicked item:', item.label);
		window.clickedItem = item.label;
	};
	function handleCanvasClick(){
		console.log('window.t', window.t);

		if (window.clickedItem === "Линейка"){
			let h = count_h(window.t);
			console.log(h, typeof h);
			if (isNaN(h) || h === 0 ){
				Swal.fire({
					icon: 'warning',
					title: 'НЕЕЕЕТ',
					text: 'Линейку можно применить только после нажатия на кнопку СТОП',
					confirmButtonText: 'Понятно',
				});
			}
			else Swal.fire({
				icon: 'success',
				title: 'Значение h',
				text: `${h.toFixed(2)}м`,
				confirmButtonText: 'Я записал!',
			});
		}
	}
	let canvas = null;
	setTimeout(()=>{
		canvas = document.getElementsByTagName("canvas")[1]
		canvas.addEventListener('click', handleCanvasClick)
	}, 800);
	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			<Inventory onSelect={handleSelect} onDragStart={handleDragStart} onItemClick={handleItemClick} />
			<Scales
				selectedObject={objectOnScales}
				onPlace={setObjectOnScales}
				onDropObject={handleDrop}
				onDragOver={handleDragOver}
				selectedObjectState={selectedObject}
				setSelectedObject={setSelectedObject}
			/>
		</div>
	);
}

function TimerComponent() {
	const { time, isRunning, hasStarted, startTimer, stopTimer } = useTimer();

	const handleStart = () => {
		if (!hasStarted) {
			startTimer();
			removeRedline();
		}
	};

	const refresh = () => window.location.reload();
	return (
		<>
			<div className="timer-container">
				<label htmlFor="timer"> таймер </label>
				<div className="timer" id="timer">{time}</div>
				<button className="start-stop-button" onClick={handleStart} disabled={isRunning || hasStarted}>Пуск</button>
				<button className="start-stop-button" onClick={stopTimer} disabled={!isRunning}>Стоп</button>
				<button className="start-stop-button" onClick={refresh}>Заново</button>
			</div>
		</>
	);
}

function removeRedline() {
	Matter.World.remove(window.engine.world, window.redline);
}

function generateVars() {
	window.k = Math.random() * 0.99 + 0.01;
	const rangeM = 0.4;
	window.m1 = parseFloat((0.3 + Math.random() * rangeM).toFixed(2));
	window.m2 = parseFloat((0.3 + Math.random() * rangeM).toFixed(2));
	window.m0 = ((window.m1 + window.m2) + 0.2 + Math.random() * 0.2);
	window.m0 = parseFloat(window.m0.toFixed(2));
	window.g = 9.8;
	window.t = null;
}

function declareVars() {
	do {
		generateVars();
	} while ((window.m1 + window.m2) * window.k > window.m0 + 0.1);
}

export function App() {
	declareVars();
	return (
		<>
			<ScalesComponent />
			<PhysicsVisualization />
			<TimerComponent />
			<Form />
		</>
	);
}



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<App />
);