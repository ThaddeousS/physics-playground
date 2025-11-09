class Entity {
    constructor(options) {
        const size = options?.size || { x: 100, y: 100 };
        const position = options?.position || { x: 400, y: 200 };
        const speed = options?.speed || 0.05;
        const collisionFilter = options?.collisionFilter || undefined;

        this.body = Bodies.rectangle(position.x, position.y, size.x, size.y, {
            collisionFilter
        });
        this.position = position;
        this.speed = speed;
        this.collisionFilter = collisionFilter;
    }

    move(direction) {
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
}