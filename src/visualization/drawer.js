import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

window.canvasWidth = window.innerWidth / 2;

let ground;
let leftWall;
let rightWall;
let ceiling;
let render;
let table;
let roller;

let block1, weight, block2;

let allElements = [];
const ropeSegments = [], segmentCount = 20, segmentLength = 1, ropeConstraints = [];

const blockWidth = 40;
const blockHeight = 20;

function createStaticElements() {
	ground = Matter.Bodies.rectangle(window.canvasWidth / 2 - 30, 390, window.canvasWidth, 20, { isStatic: true, collisionFilter: {isSensor: true,}, });
	leftWall = Matter.Bodies.rectangle(10, 200, 20, 400, { isStatic: true, collisionFilter: {isSensor: true,}, });
	rightWall = Matter.Bodies.rectangle(window.canvasWidth - 40, 200, 20, 400, { isStatic: true, collisionFilter: {isSensor: true,}, });
	ceiling = Matter.Bodies.rectangle(window.canvasWidth / 2 - 30, 10, window.canvasWidth, 20, { isStatic: true, collisionFilter: {isSensor: true,}, });
	table = Matter.Bodies.rectangle(3 * window.canvasWidth / 4, 300, window.canvasWidth / 2, 200, { isStatic: true, collisionFilter: {isSensor: true,}, });
	roller = Matter.Bodies.circle(window.canvasWidth / 2, 200, 15, {
		isStatic: true,
		render: { fillStyle: 'blue' },
		collisionFilter: {isSensor: true,},
	});
	allElements.push(ground, leftWall, rightWall, ceiling, table, roller);
}

function createDynamicElements() {
	block1 = Matter.Bodies.rectangle(2.5/4 * window.canvasWidth, 200-20, blockWidth, blockHeight, {
		mass: window.m1,
		friction: window.k,
		render: { fillStyle: 'black' },
		collisionFilter: {
			isSensor: true,
		},
	});

	block2 = Matter.Bodies.rectangle(3.5/4 * window.canvasWidth, 200-20, blockWidth, blockHeight, {
		mass: window.m2,
		friction: window.k,
		render: { fillStyle: 'black' },
		collisionFilter: {
			isSensor: true,
		},
	});

	allElements.push(
		Matter.Constraint.create({
			mass: 0,
			bodyA: block1,
			bodyB: block2,
			length: 100,
			stiffness: 1,
			// render: { visible: false },
		})
	);

	weight = Matter.Bodies.rectangle(1.5/4 * window.canvasWidth, 200-20, blockHeight, blockHeight, {
		mass: window.m2,
		friction: window.k,
		render: { fillStyle: 'black' },
		collisionFilter: {
			isSensor: true,
		},
	});
	allElements.push(block1, block2, weight);
}

function processRopes() {
	for (let i = 0; i < segmentCount; i++) {
		const segment = Matter.Bodies.rectangle(2.5/4 * window.canvasWidth + i * segmentLength, 200-20, 2, 5, {
			mass: 0,
			friction: 0.05,
			render: { visible: false },
			collisionFilter: {
				isSensor: true,
			},
		});
		ropeSegments.push(segment);
	}

	// Добавляем соединения между сегментами
	for (let i = 0; i < ropeSegments.length - 1; i++) {
		ropeConstraints.push(
			Matter.Constraint.create({
				mass: 0,
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
			mass: 0,
			bodyA: block1,
			bodyB: ropeSegments[0],
			length: blockWidth/2 + 4,
			stiffness: 1,
			// render: { visible: false },
		})
	);
	ropeConstraints.push(
		Matter.Constraint.create({
			mass: 0,
			bodyA: weight,
			bodyB: ropeSegments[ropeSegments.length - 1],
			length: blockHeight/2 + 4,
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
		engine.positionIterations = 10;
		engine.velocityIterations = 10;

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

		const mouse = Matter.Mouse.create(render.canvas);
		const mouseConstraint = Matter.MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false,
				},
			},
		});
		Matter.World.add(world, mouseConstraint);


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