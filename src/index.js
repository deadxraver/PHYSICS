import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {useTimer} from './timer';
import PhysicsVisualization from "./visualization/drawer";
import Scales from "./scales";
import Inventory from "./inventory";
import Form from "./form";
import Matter from 'matter-js'


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

	return (
		<div style={{display: 'flex', justifyContent: 'space-around'}}>
			<Inventory onSelect={handleSelect} onDragStart={handleDragStart}/>
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
	const {time, isRunning, hasStarted, startTimer, stopTimer} = useTimer();

	const handleStart = () => {
		if (!hasStarted) {
			startTimer();
			removeRedline();
		}
	};

	return (
		<>
			<div className="timer-container">
				<label htmlFor="timer"> таймер </label>
				<div className="timer" id="timer">{time}</div>
				<button className="start-stop-button" onClick={handleStart} disabled={isRunning || hasStarted}>Пуск</button>
				<button className="start-stop-button" onClick={stopTimer} disabled={!isRunning}>Стоп</button>

			</div>
		</>
	)
}

function removeRedline() {
	Matter.World.remove(window.engine.world, window.redline);
}

function generateVars() {
	window.k = Math.random() * 0.99 + 0.01;
	const rangeM = 0.4;
	window.m1 = 0.3 + Math.random() * rangeM;
	window.m2 = 0.3 + Math.random() * rangeM;
	window.m0 = (window.m1 + window.m2) + 0.2  + Math.random() * 0.2;
	window.g = 9.8;
	window.t = null;
}

function declareVars() {
	do {
		generateVars();
	} while ((window.m1 + window.m2) * window.k > window.m0 + 0.1);
}


//
// let canvas = document.getElementsByTagName("canvas");
//canvas.addEventListener('click', handleCanvasClick)
// function handleCanvasClick(){
// 	if (getSelectedItem() === 'Линейка') console.log("жопаппапаа")
// }

// console.log(getSelectedItem())
export function App() {
	declareVars();
	return (
		<>
			<ScalesComponent/>
			<PhysicsVisualization/>
			<TimerComponent/>
			<Form/>
		</>
	)
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<App/>
);