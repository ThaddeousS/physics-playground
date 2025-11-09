class Enemy extends Entity {
    constructor(options) {
        super(
            { 
                size: { x: 80, y: 80 }, 
                position: { x: 600, y: 200 }, 
                speed: 0.03,
                label: 'enemy',
                collisionFilter: {
                    category: 0x0003,
                    mask: 0x0002 | 0x0001
                },
                render: options?.render,
                engine: options?.engine,
            }
        );

        if(this.engine) {
            Matter.Events.on(this.engine, 'collisionStart', (event) => {
                const pairs = event.pairs;

                for (let i = 0, j = pairs.length; i < j; i++) {
                    const pair = pairs[i];

                    console.log('GOING THROUGH PAIRS: ', [pair.bodyA.label, pair.bodyB.label]);

                    if (pair.bodyA.label === "bullet" && pair.bodyB.label === "enemy") {
                        console.log('HIT ENEMY');
                        this.hit(10);
                    } else if (pair.bodyB.label === "bullet" && pair.bodyA.label === "enemy") {
                        console.log('HIT ENEMY');
                        this.hit(10);
                    }
                }
            });
        }
    }
}