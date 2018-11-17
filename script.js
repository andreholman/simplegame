// Initial Setup
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

// ______
var difficulty = 0.9
//\\—————


var timer

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

var colors = ["#ff9900", "#cc3333", "#ffcc00", "#f4aa09", "#ff6600", "#E86850", "#ffd800", "#6985A9", "goldenrod"]

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1
    var yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
var objects = [];
function Spawn(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
}

Spawn.prototype.update = function() {
	this.y += this.dy
	this.x += this.dx
    this.draw()
}

Spawn.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

var snake;
var ball;

// Implementation
function init() {

}

function newObstacle() {
    objects.push(new Spawn(randomIntFromRange(-50, innerWidth+50), -100, Math.random()-0.5, 10, randomIntFromRange(18, 50), colors[Math.floor(Math.random() * 9)]))
}

var trail = 0.5
var trailSubtract = true

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "rgba(0, 0, 0, 0.3)"
    c.fillRect(0, 0, canvas.width, canvas.height)

    objects.forEach(object => {
    	object.update();
        if (object.y > innerHeight + object.radius) {
            objects.splice(object, 1);
        }
        if (distance(object.x, object.y, mouse.x, mouse.y) <= 20 + object.radius) {
            document.getElementById("endgame").innerHTML = "Game over! <a href='https://andreholman.github.io/simplegame'>REPLAY</a>";
            document.getElementById("main").style.cursor = "crosshair";
            clearInterval(timer)
        }
    });

    c.beginPath()
    c.fillStyle = "white"
    snake = c.arc(mouse.x, mouse.y, 20, 0, 2*Math.PI)
    c.fill()
}

c.beginPath()
c.fillStyle = "white"
snake = c.arc(mouse.x, mouse.y, 20, 0, 2*Math.PI)
c.fill()

setTimeout(function() {
	init()
	animate()
	timer = setInterval(newObstacle, (200 - (innerWidth/10))*difficulty);
}, 550)
