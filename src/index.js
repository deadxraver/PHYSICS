import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {useTimer} from './timer';
import PhysicsVisualization from "./visualization/drawer";
import Scales from "./scales";
import Inventory from "./inventory";
import Form from "./form";


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

	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			<Inventory onSelect={handleSelect} />
			<Scales selectedObject={objectOnScales} onPlace={setObjectOnScales} selectedObjectState={selectedObject} setSelectedObject={setSelectedObject} />
		</div>
	);
}

function TimerComponent({onStart}) {
	const {time, isRunning, startTimer, stopTimer} = useTimer();

	const handleStart = () => {
		startTimer();
		onStart();
	};

	return (
		<>
			<div className="timer-container">
				<label htmlFor="timer"> таймер </label>
				<div className="timer" id="timer">{time}</div>
				<button className="start-stop-button" onClick={handleStart} disabled={isRunning}>Пуск</button>
				<button className="start-stop-button" onClick={stopTimer} disabled={!isRunning}>Стоп</button>

			</div>
		</>
	)
}

function generateVars() {
	window.k = Math.random() * 0.99 + 0.01;
	const rangeM = 2.5 - .5;
	const rangeM0 = 3 - 1;
	window.m1 = 0.5 + Math.random() * rangeM;
	window.m2 = 0.5 + Math.random() * rangeM;
	window.m0 = 1 + Math.random() * rangeM0;
}

function declareVars() {
	do {
		generateVars();
	} while ((window.m1 + window.m2) * window.k > window.m0 + 0.1);
}

export function App() {
	declareVars();
	const [showPhysics, setShowPhysics] = useState(false);
	return (
		<>
			<ScalesComponent/>
			{showPhysics && <PhysicsVisualization/>}
			<TimerComponent onStart={() => setShowPhysics(true)}/>
			<Form/>
		</>
	)
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<App/>
);