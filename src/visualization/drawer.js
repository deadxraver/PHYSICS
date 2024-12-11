import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

window.canvasWidth = window.innerWidth / 2;

let ground;
let leftWall;
let rightWall;
let ceiling;
let render;
let table;

let allElements = [];

let block1, block2, roller;
const ropeSegments = [], segmentCount = 25, segmentLength = 2, ropeConstraints = [];

function createStaticElements() {
	ground = Matter.Bodies.rectangle(window.canvasWidth / 2 - 30, 390, window.canvasWidth, 20, { isStatic: true });
	leftWall = Matter.Bodies.rectangle(10, 200, 20, 400, { isStatic: true });
	rightWall = Matter.Bodies.rectangle(window.canvasWidth - 40, 200, 20, 400, { isStatic: true });
	ceiling = Matter.Bodies.rectangle(window.canvasWidth / 2 - 30, 10, window.canvasWidth, 20, { isStatic: true });
	table = Matter.Bodies.rectangle(3 * window.canvasWidth / 4, 300, window.canvasWidth / 2, 200, { isStatic: true });
	roller = Matter.Bodies.circle(window.canvasWidth / 2, 200, 30, {
		isStatic: true,
		render: { fillStyle: 'blue' },
	});
	allElements.push(ground, leftWall, rightWall, ceiling, table, roller);
}

function createDynamicElements() {
	block1 = Matter.Bodies.rectangle(2.5/4 * window.canvasWidth, 200-20, 80, 40, {
		mass: window.m1,
		friction: window.k,
		render: { fillStyle: 'black' },
	});

	block2 = Matter.Bodies.rectangle(3.5/4 * window.canvasWidth, 200-20, 80, 40, {
		mass: window.m2,
		friction: window.k,
		render: { fillStyle: 'black' },
	});
	allElements.push(block1, block2);
}

function processRopes() {
	for (let i = 0; i < segmentCount; i++) {
		const segment = Matter.Bodies.rectangle(300, 150 + i * segmentLength, segmentLength - 1, 5, {
			mass: 0,
			friction: 0.05,
			render: { fillStyle: 'gray' },
			collisionFilter: {
				group: -1,
			},
		});
		ropeSegments.push(segment);
	}

	// Добавляем соединения между сегментами
	for (let i = 0; i < ropeSegments.length - 1; i++) {
		ropeConstraints.push(
			Matter.Constraint.create({
				bodyA: ropeSegments[i],
				bodyB: ropeSegments[i + 1],
				length: segmentLength + 5,
				stiffness: 1,
				// render: { visible: false },
			})
		);
	}

	// Соединяем первый сегмент с block1 и последний с block2
	ropeConstraints.push(
		Matter.Constraint.create({
			bodyA: block1,
			bodyB: ropeSegments[0],
			length: 80/2 + 4,
			stiffness: 1,
			// render: { visible: false },
		})
	);
	ropeConstraints.push(
		Matter.Constraint.create({
			bodyA: block2,
			bodyB: ropeSegments[ropeSegments.length - 1],
			length: 80/2 + 4,
			stiffness: 1,
			// render: { visible: false },
		})
	);
	allElements.push(...ropeSegments, ...ropeConstraints);
}

function PhysicsVisualization() {
	const sceneRef = useRef(null);

	useEffect(() => {
		// Создаем движок и мир
		const engine = Matter.Engine.create();
		const world = engine.world;

		// Создаем рендер
		render = Matter.Render.create({
			element: sceneRef.current,
			engine: engine,
			options: {
				width: window.canvasWidth - 30,
				height: 400,
				wireframes: false,
				background: '#f0f0f0',
			},
		});

		createStaticElements();
		createDynamicElements();
		processRopes();

		// Добавляем все тела в мир
		Matter.World.add(world, allElements);

		// Запускаем движок
		Matter.Engine.run(engine);
		Matter.Render.run(render);

		// Для обновления физического мира
		const runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		return () => {
			// Очищаем ресурсы при размонтировании
			Matter.Render.stop(render);
			Matter.Engine.clear(engine);
			Matter.Runner.stop(runner);
			render.canvas.remove();
			render.textures = {};
		};
	}, []);

	return <div ref={sceneRef} />;
}

export default PhysicsVisualization;