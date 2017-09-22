var huMin = 0;
var huMax = 50;
var huStep = 1;
var huChance = 2;
var hu;

var satMin = 70;
var satMax = 100;
var satStep = 1;
var satChance = 2;
var sat;

var brightMin = 90;
var brightMax = 100;
var brightStep = 1;
var brightChance = 2;
var bright

var strokeCount = 20

var canvas;

function setup()
{
	frameRate(10);
	canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);

	colorMode(HSB, 360, 100, 100);

	hu = random(huMin, huMax);
	sat = random(satMin, satMax);
	bright = random(brightMin, brightMax);
}

function draw()
{
	background(0);

	var partSize = canvas.width / strokeCount;

	for (var x = 0; x < strokeCount + 1; x++) {
		push();
		calcColors();

		var c = color(hu, sat, bright);

		fill(c);
		noStroke();

		translate(Math.ceil(x * partSize) - (canvas.width / 2.0), -canvas.height / 2.0, 0);
		rect(0, 0, Math.ceil(partSize), window.innerHeight);

	  	pop();
	}
}

function touchMoved() {
	var diff = huMax - huMin;

	var hueStart = map(mouseY, 0, canvas.height, 0, 360 - diff);

	huMin = hueStart;
	huMax = hueStart + diff;

	strokeCount = map(mouseX, 0, canvas.width, 1, 200);

	return false;
}

function calcColors()
{
  hu = border(hu + ((toInteger(random(huChance)) == 1) ? huStep : (-1) * huStep), huMin, huMax);
  sat = border(sat + ((toInteger(random(satChance)) == 1) ? satStep : (-1) * satStep), satMin, satMax);
  bright = border(bright + ((toInteger(random(brightChance)) == 1) ? brightStep : (-1) * brightStep), brightMin, brightMax);
}

function border(value, min, max)
{
  return Math.min(Math.max(min, value), max);
}

function toInteger(number){ 
  return Math.round(
    Number(number)
  ); 
};