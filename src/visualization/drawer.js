import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

function PhysicsVisualization() {
	const sceneRef = useRef(null);

	useEffect(() => {
		// Создаем движок и мир
		const engine = Matter.Engine.create();
		const world = engine.world;

		// Создаем рендер
		const render = Matter.Render.create({
			element: sceneRef.current,
			engine: engine,
			options: {
				width: 800,
				height: 400,
				wireframes: false,
				background: '#f0f0f0',
			},
		}); // lol

		// Границы сцены
		const ground = Matter.Bodies.rectangle(400, 390, 810, 20, { isStatic: true });
		const leftWall = Matter.Bodies.rectangle(10, 200, 20, 400, { isStatic: true });
		const rightWall = Matter.Bodies.rectangle(790, 200, 20, 400, { isStatic: true });
		const topWall = Matter.Bodies.rectangle(400, 10, 810, 20, { isStatic: true });

		// Создаем блоки с массой и трением
		const block1 = Matter.Bodies.rectangle(400, 300, 80, 40, {
			mass: 5,
			friction: 0.1,
			render: { fillStyle: 'black' },
		});

		const block2 = Matter.Bodies.rectangle(200, 300, 80, 40, {
			mass: 5,
			friction: 0.1,
			render: { fillStyle: 'black' },
		});

		// Создаем вращающийся валик
		const roller = Matter.Bodies.circle(300, 200, 20, {
			isStatic: true,
			render: { fillStyle: 'blue' },
		});

		// Создаем "веревку" через валик
		const ropeSegments = [];
		const segmentCount = 10;
		const segmentLength = 20;

		for (let i = 0; i < segmentCount; i++) {
			const segment = Matter.Bodies.circle(300, 150 + i * segmentLength, 5, {
				mass: 0,
				friction: 0.05,
				render: { fillStyle: 'gray' },
			});
			ropeSegments.push(segment);
		}

		// Добавляем соединения между сегментами
		const ropeConstraints = [];
		for (let i = 0; i < ropeSegments.length - 1; i++) {
			ropeConstraints.push(
				Matter.Constraint.create({
					bodyA: ropeSegments[i],
					bodyB: ropeSegments[i + 1],
					length: segmentLength,
					stiffness: 1,
					render: { visible: false },
				})
			);
		}

		// Соединяем первый сегмент с block1 и последний с block2
		ropeConstraints.push(
			Matter.Constraint.create({
				bodyA: block1,
				bodyB: ropeSegments[0],
				length: 20,
				stiffness: 1,
				render: { visible: false },
			})
		);
		ropeConstraints.push(
			Matter.Constraint.create({
				bodyA: block2,
				bodyB: ropeSegments[ropeSegments.length - 1],
				length: 20,
				stiffness: 0.9,
				render: { visible: false },
			})
		);

		// Добавляем все тела в мир
		Matter.World.add(world, [
			ground,
			leftWall,
			rightWall,
			topWall,
			block1,
			block2,
			roller,
			...ropeSegments,
			...ropeConstraints,
		]);

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