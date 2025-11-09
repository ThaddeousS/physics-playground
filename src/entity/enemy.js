class Enemy extends Entity {
    constructor(options) {
        super(
            { 
                size: { x: 80, y: 80 }, 
                position: { x: 600, y: 200 }, 
                speed: 0.03,
                collisionFilter: {
                    category: 0x0003,
                    mask: 0x0002 | 0x0001
                }
            }
        );
    }
}