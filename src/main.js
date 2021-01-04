let cvs = document.getElementById("cvs_main");
let ctx = cvs.getContext("2d");

cvs.width  = 1000;
cvs.height = 600;

class Point
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
}
class Line
{
	constructor(p1, p2, color, ctx)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.color = color;
		this.ctx = ctx;
		this.m = 0;
		this.m = 0;
		this.calc();
	}
	draw()
	{
		draw_line(this.ctx, this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.color);
	}
	calc()
	{
		this.m = (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x);
		this.b = this.p1.y-(this.p1.x*this.m);
	}
}

function draw_circle(ctx, x, y, r, c, bc)
{
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fillStyle = c;
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = bc;
	ctx.stroke();
}
function draw_line(ctx, x1, y1, x2, y2, c)
{
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.lineWidth = 5;
	ctx.strokeStyle = c;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
function draw_text(ctx, v, x, y, s, c)
{
	ctx.font = s + "px Arial";
	ctx.fillStyle = c;
	ctx.textAlign = "center";
	ctx.fillText(v, x, y);
}
function clear_text(ctx, c)
{
	ctx.fillStyle = c;
	ctx.fillRect(0, 0, width, ycenter-yquarter-yeight+4);
	draw_border(ctx, width, height, "black");
}
function draw_border(ctx, width, height, c)
{
	ctx.strokeStyle = c;
	ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, width, height);
}
function draw_clear(ctx, width, height, c)
{
	ctx.fillStyle = c;
	ctx.fillRect(0, 0, width, height);
}

cvs.addEventListener("mousemove", function(e)
{
	//dolight(e);
});

draw_clear(ctx, cvs.width, cvs.height, "black");

var lines = [new Line(new Point(0, 0), new Point(300, 200), "yellow", ctx),
		new Line(new Point(300, 500), new Point(800, 300), "blue", ctx)];
var walls = [new Line(new Point(20, 500), new Point(950, 500), "blue", ctx)];

lines[0].draw();
walls[0].draw();

reflect(lines[0], walls);

function reflect(line, walls)
{
	for (var i = 0; i < walls.length; i++)
	{
		if (line.m == walls[i].m) continue;
		var cx = (line.b-walls[i].b)/(walls[i].m-line.m);
		var cy = line.m*cx+line.b;
		line.p2.x = cx;
		line.p2.y = cy;
		line.draw();
		var deg = 2*Math.PI-(Math.atan((line.m-walls[i].m)/(1+(line.m*walls[i].m))));
		var nx = cx + 1;
		var m3 = ((2*line.m)+(walls[i].m * Math.pow(line.m, 2)) - walls[i].m) / (2*line.m*walls[i].m - Math.pow(line.m, 2) + 1);
		var ny = -8*(cy+m3);
		var nline = new Line(new Point(cx, cy), new Point(nx, ny), "red", ctx);
		nline.draw();
		console.log(m3);
	}
}


function dolight(e)
{
	ctx.beginPath();
	ctx.rect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = "black";
	ctx.fill();
	
	var area = cvs.getBoundingClientRect();
	var x = Math.round((e.clientX - area.left))-1;
	var y = Math.round((e.clientY - area.top))-1;
	light(500,300, x, y, 13);
}

function drawLine(x, y, w, z, c = "white")
{
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(w, z);
	ctx.stroke();
}
