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
const player = new Player();
const enemy = new Enemy();
const ground = Bodies.rectangle(400, 800, 1500, 60, { isStatic: true }); // Static body won't move
const roof = Bodies.rectangle(400, 0, 1500, 60, { isStatic: true }); // Static body won't move
const wall = Bodies.rectangle(0, 580, 60, 1500, { isStatic: true }); // Static body won't move
const wall2 = Bodies.rectangle(1025, 580, 60, 1500, { isStatic: true }); // Static body won't move

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {      
    keys[event.code] = false;
});

let bulletDirection = 'none';

Matter.Events.on(engine, 'beforeUpdate', () => {
    if(keys['ArrowLeft']) {
        bulletDirection = 'left';
        player.move('left');
    }

    if(keys['ArrowRight']) {
        bulletDirection = 'right';
        player.move('right');
    }

    if(keys['ArrowDown']) {
        player.move('down');
    }

    if(keys['ArrowUp']) {
        player.move('up');
    }

    if(keys['Space']) {
        let bulletSpeed = 0;
        if(bulletDirection === 'right') {
            bulletSpeed = 0.03;
        }

        if(bulletDirection === 'left') {
            bulletSpeed = -0.03;
        }

        let bulletOffset = 0;
        if(bulletDirection === 'right') {
            bulletOffset = 40;
        }

        if(bulletDirection === 'left') {
            bulletOffset = -40
        }

       const bullet = new Bullet({
            position: { x: player.body.position.x + bulletOffset, y: player.body.position.y },
            size: { x: 5, y: 25 },
            speed: 2
       });

       Matter.Body.applyForce(bullet.body, bullet.body.position, { x: bulletSpeed, y: 0 });
       Composite.add(engine.world, [bullet.body]);
    }
});

// Add bodies to the world
Composite.add(engine.world, 
    [
        player.body, 
        enemy.body, 
        ground,
        wall,
        wall2,
        roof
    ]
);

// Run the renderer
Render.run(render);

// Create a runner to update the engine
const runner = Runner.create();
Runner.run(runner, engine);