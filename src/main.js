let cvs = document.getElementById("cvs_main");
let ctx = cvs.getContext("2d");

cvs.width  = 1000
cvs.height = 600


cvs.addEventListener("mousemove", function(e)
{
	dolight(e);
});



ctx.beginPath();
ctx.rect(0, 0, cvs.width, cvs.height);
ctx.fillStyle = "black";
ctx.fill();

ctx.strokeStyle = "white";
//drawLine(0,0, 200, 200, "blue");


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

//light(0, 200, 160, 520, 5);
//light(100,500,170,10, 5);

function light(x, y, w, z, h)
{
	if (h == 0) return;
	var m = (z-y)/(w-x);
	var b = y-(m*x);

	var hitWalls = false;
	var hitRoofs = false;

	var htx = Math.abs((0+b)/m);
	var hbx = Math.abs((600+b)/m);
	if (htx < 0 || htx > 1000 ||
		hbx < 0 || hbx > 1000)// hit wall
	{
		if (x < w)
		{
			var ny = m*1000+b;
			drawLine(x, y, 1000, ny);
			var rm = -m;
			var rb = ny-(rm*1000);
			var ry = rm*0+rb;
			light(1000, ny, 0, ry, h-1);
			return;
		}
		else
		{
			var ny = m*0+b;
			drawLine(x, y, 0, ny);
			var rm = -(m);
			var rb = ny-(rm*0);
			var ry = rm*1000+rb;
			light(0, ny, 1000, ry, h-1);
			return;
			
		}
	}
	else// hit roof
	{
		if (y < z)
		{
			var nx = (600-b)/m;
			drawLine(x, y, nx, 600);
			var rm = -m;
			var rb = 600-(rm*nx);
			var rx = (0-rb)/rm;
			light(nx, 600, rx, 0, h-1);
			return;
		}
		else
		{
			var nx = (0-b)/m;
			drawLine(x, y, nx, 0);
			var rm = -m;
			var rb = 0-(rm*nx);
			var rx = (600-rb)/rm;
			light(nx, 0, rx, 600, h-1);
			return;
		}

	}



}



function drawLine(x, y, w, z, c = "white")
{
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(w, z);
	ctx.stroke();
}
