import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {useTimer} from './timer';
import PhysicsVisualization from "./visualization/drawer";
import Scales from "./scales";
import Inventory from "./inventory";

function App() {
	const {time, isRunning, startTimer, stopTimer} = useTimer();

	return (
		<>
			<Scales/>
			<Inventory/>
			<PhysicsVisualization/>
			<button onClick={startTimer} disabled={isRunning}>Пуск</button>
			<button onClick={stopTimer} disabled={!isRunning}>Стоп</button>
			<div className="timer-container">
				<div className="timer">{time}</div>
			</div>
		</>
	)
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<App/>
);