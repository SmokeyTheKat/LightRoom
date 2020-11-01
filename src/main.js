let cvs = document.getElementById("cvs_main");
let ctx = cvs.getContext("2d");

cvs.width  = 1000
cvs.height = 600


ctx.beginPath();
ctx.rect(0, 0, cvs.width, cvs.height);
ctx.fillStyle = "black";
ctx.fill();

ctx.strokeStyle = "white";
//drawLine(0,0, 200, 200, "blue");


light(0, 200, 460, 220, 2);
//light(100,500,170,10, 5);

function light(x, y, w, z, h)
{
	if (h == 0) return;
	var m = (z-y)/(w-x);
	var b = y-(m*x);

	var hitWalls = false;
	var hitRoofs = false;

	var htx = (0+b)/m;
	var hbx = (600+b)/m;
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
			light(1000, ny, ry, 0, h-1);
			return;
		}
		else
		{
			var ny = m*0+b;
			drawLine(x, y, 0, ny);
			var rm = -(m);
			var rb = ny-(rm*0);
			var ry = rm*1000+rb;
			light(0, ny, ry, 1000, h-1);
			return;
			
		}
	}
	if (htx < 0 || htx > 1000)// hit roof
	{

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
