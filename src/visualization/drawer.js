import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

function PhysicsVisualization() { // пример реализации библы!!
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
		});

		// Границы сцены
		const ground = Matter.Bodies.rectangle(400, 390, 810, 20, { isStatic: true });
		const leftWall = Matter.Bodies.rectangle(10, 200, 20, 400, { isStatic: true });
		const rightWall = Matter.Bodies.rectangle(790, 200, 20, 400, { isStatic: true });
		const topWall = Matter.Bodies.rectangle(400, 10, 810, 20, { isStatic: true });

		// Движущиеся шары
		const ballA = Matter.Bodies.circle(300, 50, 30, {
			restitution: 0.9,
			render: { fillStyle: 'blue' },
		});
		const ballB = Matter.Bodies.circle(500, 100, 40, {
			restitution: 0.8,
			render: { fillStyle: 'red' },
		});

		// Устанавливаем начальную скорость
		Matter.Body.setVelocity(ballA, { x: 2, y: 3 });
		Matter.Body.setVelocity(ballB, { x: -3, y: -2 });

		// Добавляем все тела в мир
		Matter.World.add(world, [ground, leftWall, rightWall, topWall, ballA, ballB]);

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
