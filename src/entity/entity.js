class Entity {
    constructor(options) {
        const size = options?.size || { x: 100, y: 100 };
        const position = options?.position || { x: 400, y: 200 };
        const speed = options?.speed || 0.05;
        const collisionFilter = options?.collisionFilter || undefined;
        const render = options?.render || undefined;
        const engine = options?.engine || undefined;
        const health = options?.health || 100;

        this.body = Bodies.rectangle(position.x, position.y, size.x, size.y, {
            collisionFilter
        });
        this.body.label = options?.label || 'entity';

        this.position = position;
        this.speed = speed;
        this.collisionFilter = collisionFilter;
        this.render = render;
        this.engine = engine;
        this.health = health;
        this.removed = false;

        if(this.engine) {
            /*Matter.Events.on(this.engine, 'collisionEnd', (event) => {
                if(this.health <= 0) {
                    Matter.Composite.remove(event.World, this.body, true);
                    this.removed = true;
                }
            });*/

            if(this.render) {
                Matter.Events.on(this.engine, 'afterUpdate', () => {
                    if(this.removed) {
                        return;
                    }

                    const context = this?.render?.canvas?.getContext('2d');

                    if(context) {
                        context.save();
                        context.font = '12px Arial';
                        context.fillStyle = 'black';
                        context.fillText(this.health, this.body.position.x, this.body.position.y);
                        context.restore();
                    }
                });
            }
        }
    }

    move(direction) {
        if(this.removed) {
            return;
        }

        if(direction === 'right') {
            Matter.Body.applyForce(this.body, this.body.position, { x: this.speed, y: 0 });
        }

        if(direction === 'left') {
            Matter.Body.applyForce(this.body, this.body.position, { x: -this.speed, y: 0 });
        }

        if(direction === 'up') {
            Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -this.speed });
        }

        if(direction === 'down') {
            Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: this.speed });
        }
    }

    hit(amount) {
        if(this.removed) {
            return;
        }

        this.health -= amount;
        if(this.health < 0) {
            this.health = 0;
            this.removed = true;
        }
    }
}