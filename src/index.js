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
	return (
		<div style={{display: 'flex', justifyContent: 'space-around'}}>
			<Inventory onSelect={setSelectedObject}/>
			<Scales selectedObject={objectOnScales} onPlace={setObjectOnScales} selectedObjectState={selectedObject}
					setSelectedObject={setSelectedObject}/>
		</div>
	)
}

function TimerComponent() {
	const {time, isRunning, startTimer, stopTimer} = useTimer();
	return (
		<>
			<div className="timer-container">
				<label htmlFor="timer"> таймер </label>
				<div className="timer" id="timer">{time}</div>
				<button className="start-stop-button" onClick={startTimer} disabled={isRunning}>Пуск</button>
				<button className="start-stop-button" onClick={stopTimer} disabled={!isRunning}>Стоп</button>

			</div>
		</>
	)
}

function App() {
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