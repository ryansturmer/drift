const ROT_SPEED = 0.003;
const PROJECTILE_VELOCITY = 2;

var G = 0.02;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
document.addEventListener('keydown', (event) => {
	//event.preventDefault();
	if(model.state == 'win') {
		if(event.key == 'Enter') {
			model.nextLevel();				
		}
		return;
	}

	switch(event.key) {
		case "ArrowRight":
		case "ArrowUp":
			model.rotateShipRight();
			break;

		case "ArrowLeft":
		case "ArrowDown":
			model.rotateShipLeft();
			break;

		case "Enter":
			if(model.state != 'paused') {
				model.restart();					
			}
			break;

		case " ":
			if(model.state === 'paused') {
				var p = document.getElementById('palette');
				p.style.display = p.style.display === 'block' ? 'none' : 'block';
			} else {
				model.fireGun();					
			}
			break;
		case "n":
		case "N":
			if(model.state !== 'paused') {
				model.nextLevel();
			}
			break;

		case "s":
		case "S":
			event.preventDefault();
			model.saveCurrentLevelState();
			model.showTitle('Saved', 1000)
			break;
		case "p":
		case "P":
			if(model.state !== 'paused') {
				model.prevLevel();
			}
			break;
		case "Escape":
			event.preventDefault();
			view.updateProperties();
			if(model.state === 'paused') { model.resume(); }
			else { model.pause();}
			break;
		case "Tab":
			if(model.state != 'paused') {
				event.preventDefault();
			}
			break;
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if(model.state != 'paused') {
				model.jumpToLevel(parseInt(event.key)-1);					
			}
			break;

	} 
});

var view = new DriftView(canvas);
view.setModel(model);
var currentItem = null;
var dragItem = null;
var dragOffset = null;

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

document.addEventListener('keyup', (evt) => {
	model.stopShipRotate();
});

canvas.addEventListener('mousedown', (evt) => {
	if(model.state != 'paused') { return; }
	var pos = getMousePos(canvas, evt);

	model.planets.forEach((planet, planet_idx) =>  {
		if(dist(pos, planet) < 32) {
			dragItem = planet;
			currentItem = planet;
			dragOffset = {x : planet.x - pos.x, y : planet.y - pos.y};
		}
	});
	
	model.clouds.forEach((cloud, cloud_idx) =>  {
		if(dist(pos, cloud) < 32) {
			dragItem = cloud;
			currentItem = cloud;
			dragOffset = {x : cloud.x - pos.x, y : cloud.y - pos.y};
		}
	});

	if(dist(pos, model.ship) < 20) {
		dragItem = model.ship;
		currentItem = model.ship;
		dragOffset = {x : model.ship.x - pos.x, y : model.ship.y - pos.y};
	}
	
	if(dist(pos, model.goal) < 20) {
		dragItem = model.goal;
		currentItem = model.goal;
		dragOffset = {x : model.goal.x - pos.x, y : model.goal.y - pos.y};
	}

	if(currentItem) {
		view.showProperties(currentItem);
	} else {
		currentItem = model.levels[model.level];
		view.showProperties(currentItem);
	}
});

canvas.addEventListener('mouseup', (evt) => {
	if(model.state != 'paused') { return; }
	dragItem = null;
	currentOrigin = null;
});

canvas.addEventListener('mousemove', (evt) => {
	if(model.state != 'paused') { return; }
	var pos = getMousePos(canvas, evt);
	if(dragItem) {
		currentItem.x = pos.x + dragOffset.x;
		currentItem.y = pos.y + dragOffset.y;
		view.updateProperties();
	}
});

canvas.addEventListener('dblclick', (evt) => {
	if(model.state != 'paused') { return; }
		var pos = getMousePos(canvas, evt);

		model.planets.forEach((planet, planet_idx) =>  {
			if(dist(pos, planet) < 32) {
				model.destroyPlanet(planet);
			}
		});
		
		model.clouds.forEach((cloud, cloud_idx) =>  {
			if(dist(pos, cloud) < 32) {
				model.destroyCloud(cloud);
			}
		});
		view.updateProperties();
});

document.getElementById('palette-tab-items').addEventListener('click', evt => {
	document.getElementById('palette-items').style.display = 'block';
	document.getElementById('palette-properties').style.display = 'none';
	document.getElementById('palette-tab-items').style['text-decoration'] = 'underline';
	document.getElementById('palette-tab-properties').style['text-decoration'] = 'none';

});

document.getElementById('palette-tab-properties').addEventListener('click', evt => {
	document.getElementById('palette-items').style.display = 'none';
	document.getElementById('palette-properties').style.display = 'block';
	document.getElementById('palette-tab-items').style['text-decoration'] = 'none';
	document.getElementById('palette-tab-properties').style['text-decoration'] = 'underline';
});

var last_ts = 0;
function step(ts) {
	model.update(ts);
	view.draw();
	window.requestAnimationFrame(step);
}

window.onload = function() {
	model.loadLevels(levels,0);
	model.start();
	window.requestAnimationFrame(step);		
}

document.getElementById('save-button').addEventListener('click', evt => {
	evt.preventDefault();
	download('level.drift', JSON.stringify(model.levels[model.level], null, 2))
});

document.getElementById('load-button').addEventListener('click', evt => {
	var elem = document.getElementById('upload');
	elem.click();
});

document.getElementById('upload').addEventListener('change', evt => {
	var files = evt.target.files; // FileList object
	var file = files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
		var contents = e.target.result;
		var level = JSON.parse(contents);
		model.loadLevel(level);
	};
	reader.readAsText(file);
}, false);