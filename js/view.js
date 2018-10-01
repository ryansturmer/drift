/*var img_ship = document.getElementById('img-ship');
var img_goal = document.getElementById('img-goal');
var img_planet = document.getElementById('img-planet');
var img_cracked = document.getElementById('img-cracked');
var img_fragment = document.getElementById('img-fragment');
var img_rock = document.getElementById('img-rock');
var img_cloud = document.getElementById('img-cloud');
var img_portal = document.getElementById('img-portal');
var img_you_died = document.getElementById('img-you-died');
var img_you_win = document.getElementById('img-you-win');
*/

function dist(a,b) {
	return Math.sqrt((b.y-a.y)**2 + (b.x - a.x)**2)
}

function DriftView(canvas) {
	
	// Load images
	var images = document.getElementsByClassName('asset');
	this.images = {};
	for(var i=0; i<images.length; i++) {
		var image = images[i];
		this.images[image.id] = image;
	}

	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.palette = document.getElementById('palette');
	this.toolbox = 	document.getElementById('palette-items');
	this.properties = 	document.getElementById('palette-properties');
	
	// The item currently being edited, and its properties
	this.editItem = null;
	this.currentProperties = [];

	this.addPaletteButton(this.images['img-planet'], 'Planet', evt => {
		this.model.newPlanet(this.canvas.width/2, this.canvas.height/2, 150, 'planet');
	});
	this.addPaletteButton(this.images['img-cracked'], 'Cracked Planet', evt => {
		this.model.newPlanet(this.canvas.width/2, this.canvas.height/2, 150, 'cracked');
	});

	this.addPaletteButton(this.images['img-rock'], 'Rock', evt => {
		this.model.newPlanet(this.canvas.width/2, this.canvas.height/2, 150, 'rock');
	});

	this.addPaletteButton(this.images['img-cloud'], 'Cloud', evt => {
		this.model.newCloud(this.canvas.width/2, this.canvas.height/2, 0.25);
	});

	this.lastModelState = null;

}

DriftView.prototype.addPaletteButton = function(image, text, clickHandler) {
	var containerElement = document.createElement('div');
	var imageElement = document.createElement('img');
	imageElement.src = image.src;
	imageElement.style = 'margin-bottom: 5px;'
	imageElement.draggable = false;

	containerElement.appendChild(imageElement);
	containerElement.style = 'margin-bottom: 15px;'
	if(text) {
		var textElement = document.createElement('div');
		textElement.innerHTML = text;		
		containerElement.appendChild(textElement);
	}

	if(clickHandler) {
		containerElement.addEventListener('click', clickHandler);		
	}

	this.toolbox.appendChild(containerElement);
}

DriftView.prototype.showProperties = function(item) {
	this.properties.innerHTML = "";
	this.currentProperties = [];
	this.editItem = null;
	var props = this.model.getProperties(item);
	if(!props || (props.length == 0)) { return; }
	this.currentProperties = props;
	this.editItem = item;
	this.editControls = {};
	props.forEach(property => {
		var container = document.createElement('div');
		
		var lbl = document.createElement('div');
		lbl.innerHTML = property;
		
		var input = document.createElement('input');
		input.value = item[property];
		input.addEventListener('change', evt => {
			try {
				var f = parseFloat(evt.target.value);
				item[property] = f;
			} catch(err) {
				evt.cancel();
			}
		});
		container.appendChild(lbl);
		container.appendChild(input);
		this.properties.appendChild(container);
		this.editControls[property] = input;
	});
	console.log(this.editControls)
}

DriftView.prototype.updateProperties = function() {
	for(var key in this.editControls) {
		this.editControls[key].value = this.editItem[key];
	}
}

DriftView.prototype.drawItem = function(item, name) {
	var img = this.images[name];
	this.ctx.drawImage(img, item.x-(img.width/2),item.y-(img.height/2));
}

DriftView.prototype.setModel = function(model) {
	this.model = model;
}

DriftView.prototype.drawShip = function(ship) {
	var img_ship = this.images['img-ship'];
	this.ctx.save();
	this.ctx.translate(ship.x, ship.y);
	this.ctx.rotate(ship.phi);
	this.ctx.drawImage(img_ship, -(img_ship.width/2),-(img_ship.height/2));
	this.ctx.restore();
}

DriftView.prototype.drawPlanet = function(planet) {
	switch(planet.type) {
		case 'rock':
			this.drawItem(planet, 'img-rock');
			break;			
		case 'cracked':
			this.drawItem(planet, 'img-cracked');
			break;			
		default:
			this.drawItem(planet, 'img-planet');
			break;
	}
}

DriftView.prototype.drawProjectile = function(projectile) {
	this.ctx.fillStyle = "white";
	this.ctx.fillRect(projectile.x - projectile.size/2, projectile.y-projectile.size/2, projectile.size, projectile.size);
}

DriftView.prototype.drawText = function(text, style) {		
	this.ctx.font = "48px MrPixel"
	var metrics = ctx.measureText(text);
	this.ctx.fillText(text, (canvas.width/2)-(metrics.width/2), 300);
}

DriftView.prototype.draw = function() {
	// Blank the screen
	this.ctx.fillStyle = "black";
	this.ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

	this.model.portals.forEach(portal => {
		this.drawItem(portal.a, 'img-portal');
		this.drawItem(portal.b, 'img-portal');
	})

	this.drawItem(this.model.goal, 'img-goal');

	this.model.planets.forEach(planet => {
		this.drawPlanet(planet);
	})

	this.model.fragments.forEach(fragment => {
		this.drawItem(fragment, 'img-fragment');
	})

	model.projectiles.forEach(projectile => {
		this.drawProjectile(projectile);
	})

	if(model.state != 'dead' && model.state != 'dying') {
		this.drawShip(model.ship);
	}

	this.ctx.fillStyle ='white';

	this.model.clouds.forEach(cloud => {
		this.drawItem(cloud, 'img-cloud');
	})

	this.model.particles.forEach(particle => {
		this.ctx.fillRect(particle.x - 3, particle.y-3, 6, 6);
	});
	
	// Draw placard at end of gain
	switch(this.model.state) {
		case 'dying':
		case 'dead':
			this.drawItem({x : this.canvas.width/2, y: this.canvas.height/2}, 'img-you-died')
			break;
		case 'win':
			this.drawItem({x : this.canvas.width/2, y: this.canvas.height/2}, 'img-you-win');
			break;
	}	

	if(this.model.title.lifespan > 0) {
		if(this.model.title.lifespan > 1000) {
			this.drawText(this.model.title.text, 'white');
		} else {
			ctx.globalAlpha = this.model.title.lifespan/1000;
			this.drawText(this.model.title.text, 'white');
			ctx.globalAlpha = 1;
		}
	}
	if(this.model.state != this.lastModelState) {
		if(this.model.state === 'paused') {
			this.palette.style.display = 'block';
		} else {
			this.palette.style.display = 'none';
		}		
	}
	this.lastModelState = this.model.state;
}

