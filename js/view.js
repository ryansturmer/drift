var img_ship = document.getElementById('img-ship');
var img_goal = document.getElementById('img-goal');
var img_planet = document.getElementById('img-planet');
var img_cracked = document.getElementById('img-cracked');
var img_fragment = document.getElementById('img-fragment');
var img_rock = document.getElementById('img-rock');
var img_cloud = document.getElementById('img-cloud');
var img_portal = document.getElementById('img-portal');
var img_you_died = document.getElementById('img-you-died');
var img_you_win = document.getElementById('img-you-win');

function dist(a,b) {
	return Math.sqrt((b.y-a.y)**2 + (b.x - a.x)**2)
}

function DriftView(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.palette = document.getElementById('palette');
	this.toolbox = 	document.getElementById('palette-items');
	this.properties = 	document.getElementById('palette-properties');

	this.addPaletteButton(img_planet, 'Planet', evt => {
		this.model.newPlanet(this.canvas.width/2, this.canvas.height/2, 150, 'planet');
	});
	this.addPaletteButton(img_cracked, 'Cracked Planet', evt => {
		this.model.newPlanet(this.canvas.width/2, this.canvas.height/2, 150, 'cracked');
	});

	this.addPaletteButton(img_rock, 'Rock', evt => {
		this.model.newPlanet(this.canvas.width/2, this.canvas.height/2, 150, 'rock');
	});

	this.addPaletteButton(img_cloud, 'Cloud', evt => {
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


DriftView.prototype.setModel = function(model) {
	this.model = model;
}

DriftView.prototype.drawShip = function(ship) {
	this.ctx.save();
	this.ctx.translate(ship.x, ship.y);
	this.ctx.rotate(ship.phi);
	this.ctx.drawImage(img_ship, -(img_ship.width/2),-(img_ship.height/2));
	this.ctx.restore();
}

DriftView.prototype.drawGoal = function(goal) {
	this.ctx.drawImage(img_goal, goal.x-(img_goal.width/2),goal.y-(img_goal.height/2));
}

DriftView.prototype.drawPortal = function(portal) {
	this.ctx.drawImage(img_portal, portal.a.x-(img_portal.width/2), portal.a.y-(img_portal.height/2));
	this.ctx.drawImage(img_portal, portal.b.x-(img_portal.width/2), portal.b.y-(img_portal.height/2));
}
DriftView.prototype.drawPlanet = function(planet) {
	switch(planet.type) {
		case 'rock':
			this.ctx.drawImage(img_rock, planet.x-(img_rock.width/2),planet.y-(img_rock.height/2));
			break;			
		case 'cracked':
			this.ctx.drawImage(img_cracked, planet.x-(img_cracked.width/2),planet.y-(img_cracked.height/2));
			break;			
		default:
			this.ctx.drawImage(img_planet, planet.x-(img_planet.width/2),planet.y-(img_planet.height/2));
			break;
	}
}

DriftView.prototype.drawFragment = function(fragment) {
	this.ctx.drawImage(img_fragment, fragment.x-(img_fragment.width/2),fragment.y-(img_fragment.height/2));		
}

DriftView.prototype.drawCloud = function(cloud) {
	this.ctx.drawImage(img_cloud, cloud.x-(img_cloud.width/2),cloud.y-(img_cloud.height/2));
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
		this.drawPortal(portal);
	})

	this.drawGoal(model.goal);

	this.model.planets.forEach(planet => {
		this.drawPlanet(planet);
	})

	this.model.fragments.forEach(fragment => {
		this.drawFragment(fragment);
	})

	model.projectiles.forEach(projectile => {
		this.drawProjectile(projectile);
	})

	if(model.state != 'dead' && model.state != 'dying') {
		this.drawShip(model.ship);
	}

	this.ctx.fillStyle ='white';

	this.model.clouds.forEach(cloud => {
		this.drawCloud(cloud);
	})

	this.model.particles.forEach(particle => {
		this.ctx.fillRect(particle.x - 3, particle.y-3, 6, 6);
	});
	
	// Draw "YOU DIED" if player dies.
	if(this.model.state === 'dead' || this.model.state === 'dying') {
		this.ctx.drawImage(img_you_died, canvas.width/2-img_you_died.width/2, canvas.height/2-img_you_died.height/2)
		return;
	}

	// Draw the checkmark if player wins
	if(this.model.state == 'win') {
		this.ctx.drawImage(img_you_win, canvas.width/2-img_you_win.width/2, canvas.height/2-img_you_win.height/2)
		return;
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
			console.log("paused!")
			this.palette.style.display = 'block';
		} else {
			this.palette.style.display = 'none';
		}		
	}
	this.lastModelState = this.model.state;
}

