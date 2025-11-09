// Destructure Matter.js modules for easier access
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// Create a Matter.js engine
const engine = Engine.create();

// Create a renderer to display the simulation on a canvas
const render = Render.create({
    element: document.body, // Or a specific HTML element
    engine: engine,
    options: {
        width: 1024,
        height: 768,
        wireframes: false, // Set to true for debugging outlines
        background: '#f0f0f0',
    }
});

// Create some physical bodies
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(100, 200, 80, 80);
const ground = Bodies.rectangle(400, 580, 1000, 60, { isStatic: true }); // Static body won't move

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

Matter.Events.on(engine, 'beforeUpdate', () => {
    if(keys['ArrowLeft']) {
        Matter.Body.applyForce(boxA, boxA.position, { x: -0.05, y: 0 });
    }

    if(keys['ArrowRight']) {
        Matter.Body.applyForce(boxA, boxA.position, { x: 0.05, y: 0 });
    }

    if(keys['ArrowUp']) {
        Matter.Body.applyForce(boxA, boxA.position, { x: 0, y: -0.05 });
    }

    if(keys['ArrowDown']) {
        Matter.Body.applyForce(boxA, boxA.position, { x: 0, y: 0.05 });
    }
});

// Add bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// Run the renderer
Render.run(render);

// Create a runner to update the engine
const runner = Runner.create();
Runner.run(runner, engine);