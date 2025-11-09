class Bullet extends Entity {
    constructor(options) {
        super(
            { 
                size: options?.size || { x: 15, y: 5 }, 
                position: options?.position || { x: 0, y: 0 }, 
                speed: options?.speed || 2,
                label: 'bullet',
                collisionFilter: {
                    category: 0x0002,
                    mask: 0x0003
                },
                render: options?.render,
                engine: options?.engine,
            }
        );
    }
}