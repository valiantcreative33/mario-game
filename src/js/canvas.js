import platform from '../images/platform.png'
import hills from '../images/hills.png'
import background from '../images/background.png'
import platformSmallTall from '../images/platformSmallTall.png'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

const gravity = 3.3
class Player {
    constructor() {
        this.speed = 9
        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 50
        this.height = 50
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        
        this.image = image
        this.width = image.width
        this.height = image.height

    }

    draw() {
        c.drawImage(this.image, this.position.x,
            this.position.y)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        
        this.image = image
        this.width = image.width
        this.height = image.height

    }

    draw() {
        c.drawImage(this.image, this.position.x,
            this.position.y)
    }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

let platformImage = createImage(platform)
// let platformSmallTall = createImage(platformSmallTall)

let player = new Player()
let platforms = []
let genericObjects = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

let scrollOffset = 0

function init() {

    platformImage = createImage(platform)

    player = new Player()
    platforms = [
    new Platform({
        x: platformImage.width * 4.50 + 300,
        y: 375,
        image: createImage(platformSmallTall)
    }),
    new Platform({
        x: -0, 
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width - 2,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 2.10 + 100,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 3.40 + 200,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 5.50 + 300,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 7.00 + 300,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 8.25 + 300,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 9.25 + 300 -2,
        y: 470,
        image: platformImage
    }),
    new Platform({
        x: platformImage.width * 10.25 + 300 -2,
        y: 370,
        image: createImage(platformSmallTall)
    })
    ]

    genericObjects = [
    new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
    }),
    new GenericObject({
        x: -1,
        y: -1,
        image: createImage(hills)
    })
    ]

    scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed && player.position.x > 400) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
            platform.position.x -= player.speed
        })

        genericObjects.forEach((genericObject) => {
            genericObject.position.x -= player.speed * .77
        })
        
        } else if (keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
            platform.position.x += player.speed
        })

        genericObjects.forEach((genericObject) => {
            genericObject.position.x += player.speed * .77
        })
        }
    }

    // platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height
            <= platform.position.y &&
            player.position.y + player.height +
            player.velocity.y >= platform.position.y 
            && player.position.x + player.width >= 
            platform.position.x && player.position.x 
            <= platform.position.x + platform.width
            ) {
            player.velocity.y = 0
            }
        })

        // win condition
        if (scrollOffset > platformImage.width * 10.00 + 300 -2) {
            console.log('You Win!');
        }

        // lose condition
        if (player.position.y > canvas.height) {
            init()
        }
    }

init()
animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true
            break

        case 83:
            console.log('down');
            break

        case 68:
            console.log('right');
            keys.right.pressed = true
            break

        case 87:
            console.log('up');
            player.velocity.y -= 33
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false
            break

        case 83:
            console.log('down');
            break

        case 68:
            console.log('right');
            keys.right.pressed = false
            break

        case 87:
            console.log('up');
            break
    }
})
