class Player extends Entity {
    constructor() {
        super(
            { 
                size: { x: 80, y: 80 }, 
                position: { x: 200, y: 200 }, 
                speed: 0.03,
                collisionFilter: {
                    category: 0x0001,
                    mask: 0x0003
                }
            }
        );
    }
}