import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';

function changeButton(e) {
	e.target.innerText = 'СКОРО ДРОП';
}

function App() {
	return (
		<>
			<button id="hello-button" onClick={changeButton}>Тапните</button>
		</>
	)
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<App/>
);