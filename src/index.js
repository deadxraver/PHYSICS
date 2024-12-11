import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { useTimer } from './timer';


function changeButton(e) {
	e.target.innerText = 'СКОРО ДРОП';
}

function App() {

	const { time, isRunning, startTimer, stopTimer } = useTimer();


	return (
		<>
			{/*<button id="hello-button" onClick={changeButton}>Тапните</button>*/}

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