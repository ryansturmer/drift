var model = {
	uid : 0,
	ship : {
		class : 'ship',
		mass : 1,
		theta : 0,
		phi : 0,
		rotate : 0,
		v : [0,0]
	},
	planets : [],
	clouds : [],
	goal : {},
	projectiles : [],
	particles : [],
	fragments : [],
 	ts : null,
	levels : [],
	portals : [],
	title : {
		text : '',
		lifespan : 0
	},
	level : 0
};
model.destroyPlanet = function(planet) {
	var planet_idx = this.planets.indexOf(planet);
	if(planet_idx === -1) { return; }

	this.planets.splice(planet_idx, 1);
	for(var i=0; i<20; i++) {
		var angle = Math.random()*6.28;
		var v = (1+Math.random())/2.0;
		this.particles.push({
			x : (planet.x + 32*Math.cos(angle)),
			y : (planet.y + 32*Math.sin(angle)),
			lifespan : Math.random()*800,
			v : [v*Math.cos(angle), v*Math.sin(angle)]
		})
	}
}

model.destroyCloud = function(cloud) {
	var cloud_idx = this.clouds.indexOf(cloud);
	if(cloud_idx === -1) { return; }

	this.clouds.splice(cloud_idx, 1);
	for(var i=0; i<20; i++) {
		var angle = Math.random()*6.28;
		var v = (1+Math.random())/2.0;
		this.particles.push({
			x : (cloud.x + 32*Math.cos(angle)),
			y : (cloud.y + 32*Math.sin(angle)),
			lifespan : Math.random()*800,
			v : [v*Math.cos(angle), v*Math.sin(angle)]
		})
	}
}

model.update = function(ts) {

		// First run through
		if(this.ts === null) {
			this.ts = ts;
			return;
		}
		// Update time
		var	dt = ts - this.ts;
		this.ts = ts;
		
		// Wizards only, fools
		this.particles.forEach((particle, idx) => {
			particle.x += particle.v[0]*dt;
			particle.y += particle.v[1]*dt;
			particle.lifespan -= dt;
			if(particle.lifespan <= 0) {
				this.particles.splice(idx, 1);
			}
		});

		// Fade out the title
		if(this.title.lifespan > 0) {
			this.title.lifespan -= dt;
		}
		
		switch(this.state) {
			case 'dying':
				if(this.particles.length == 0) {
					this.state = 'dead';
					return;
				}
				break;
			case 'playing':
			break;
			default:
				this.ts = null; return;
			break;
		}

		

		// If dying, only process particles
		if(this.state === 'dying') { return; }

		var ship = this.ship;

		// Projectile-planet and Projectile-fragment collision
		this.projectiles.forEach((projectile, projectile_idx) => {
			this.fragments.forEach((fragment, fragment_idx) => {
				if(dist(projectile, fragment) < 16) {
					this.projectiles.splice(projectile_idx, 1);
					this.fragments.splice(fragment_idx, 1);
							for(var i=0; i<10; i++) {
								var angle = Math.random()*6.28;
								var v = (1+Math.random())/2.0;
								this.particles.push({
									x : (fragment.x + 32*Math.cos(angle)),
									y : (fragment.y + 32*Math.sin(angle)),
									lifespan : Math.random()*800,
									v : [v*Math.cos(angle), v*Math.sin(angle)]
								})
							}
				}
			});

			this.planets.forEach((planet, planet_idx) =>  {
				if(dist(projectile, planet) < 32) {
					this.projectiles.splice(projectile_idx, 1);
					switch(planet.type || 'planet') {
						case 'planet':
							this.planets.splice(planet_idx, 1);
							for(var i=0; i<20; i++) {
								var angle = Math.random()*6.28;
								var v = (1+Math.random())/2.0;
								this.particles.push({
									x : (planet.x + 32*Math.cos(angle)),
									y : (planet.y + 32*Math.sin(angle)),
									lifespan : Math.random()*800,
									v : [v*Math.cos(angle), v*Math.sin(angle)]
								})
							}
							break;

						case 'rock':
						break;

						case 'cracked':
							this.planets.splice(planet_idx, 1);
							for(var i=0; i<50; i++) {
								var angle = Math.random()*6.28;
								var v = 2*(1+Math.random())/2.0;
								this.particles.push({
									x : (planet.x + 32*Math.cos(angle)),
									y : (planet.y + 32*Math.sin(angle)),
									lifespan : Math.random()*50,
									v : [v*Math.cos(angle), v*Math.sin(angle)]
								})
							}
								angle = planet.angle || 0;
								uid = this.getUID();
								this.fragments.push({
									x : planet.x  + 16*Math.cos(angle),
									y : planet.y + 16*Math.sin(angle),
									v : [Math.cos(angle)*planet.v, Math.sin(angle)*planet.v],
									mass : planet.mass/2.0,
									uid : uid
								});
								this.fragments.push({
									x : planet.x  + -16*Math.cos(angle),
									y : planet.y + -16*Math.sin(angle),
									v : [-Math.cos(angle)*planet.v, -Math.sin(angle)*planet.v],
									mass : planet.mass/2.0,
									uid : uid
								});

						break;

					}
				}
			});
		});

		// Planet-ship collision
		this.planets.forEach(planet => {
			if(dist(ship, planet) < 32) {
				this.die();
			}
		});

		// Fragment collision
		this.fragments.forEach((fragment,i) => {

			// Ship
			if(dist(ship, fragment) < 16) {
				this.die();
			}
			
			// Other fragments
			this.fragments.forEach((fragment2, j) => {
				if(i!=j && fragment.uid != fragment2.uid) {
					if(dist(fragment, fragment2) < 32) {
							for(var a=0; a<30; a++) {
								var angle = Math.random()*6.28;
								var v = (1+Math.random())/2.0;
								this.particles.push({
									x : (fragment.x + fragment2.x)/2,
									y :  (fragment.y + fragment2.y)/2,
									lifespan : Math.random()*800,
									v : [v*Math.cos(angle), v*Math.sin(angle)]
								})
							}
						if(i < j) {
							this.fragments.splice(i, 1);							
							this.fragments.splice(j-1, 1);							
						} else {
							this.fragments.splice(j, 1);							
							this.fragments.splice(i-1, 1);							
						}
					}
				}
			});
		});

		// Ship-goal collision
		if(dist(ship, this.goal) < 40) {
			this.win();
		}

		// Ship movement
		this.planets.forEach(planet => {
			var r = dist(planet, ship);
			var ru = [(planet.x - ship.x) / r, (planet.y - ship.y) / r] 
			var f = G*ship.mass*planet.mass/(r*r);
			var a = f*ship.mass;
			var dv = [ru[0]*a*dt, ru[1]*a*dt]
			ship.vx += dv[0]
			ship.vy += dv[1]
		});

		this.fragments.forEach(fragment => {
			var r = dist(fragment, ship);
			var ru = [(fragment.x - ship.x) / r, (fragment.y - ship.y) / r] 
			var f = G*ship.mass*fragment.mass/(r*r);
			var a = f*ship.mass;
			var dv = [ru[0]*a*dt, ru[1]*a*dt]
			ship.vx += dv[0]
			ship.vy += dv[1]
		});

		this.fragments.forEach(fragment => {
			fragment.x += fragment.v[0]*dt;
			fragment.y += fragment.v[1]*dt;
		});

		this.clouds.forEach(cloud => {
			if(dist(ship, cloud) < 32) {
				ship.vx = ship.vx * (1-cloud.drag)
				ship.vy = ship.vy * (1-cloud.drag)
			}
		});

		// Move the ship 
		ship.x += ship.vx*dt;
		ship.y += ship.vy*dt;

		// Projectile motion
		this.projectiles.forEach(projectile => {
			projectile.x += projectile.v[0]*dt;
			projectile.y += projectile.v[1]*dt;	
		});

		// Ship rotation
		this.ship.phi += this.ship.rotate*dt;

		this.portals.forEach(portal => {
			if(portal.tenant) {
				if((dist(portal.a, portal.tenant) > 20) && (dist(portal.b, portal.tenant) > 20)) {
					portal.tenant = null;
				}
			} else {
				if(dist(portal.a, ship) < 20) {
					this.sparkle(this.ship);
					portal.tenant = ship;
					ship.x = portal.b.x;
					ship.y = portal.b.y;	
					this.sparkle(this.ship);
				}
				else if(dist(portal.b, ship) < 20) {
					this.sparkle(this.ship);
					portal.tenant = ship;
					ship.x = portal.a.x;
					ship.y = portal.a.y;
					this.sparkle(this.ship);
				} 	
				this.fragments.forEach(fragment => {
					if(dist(portal.a, fragment) < 20) {
						this.sparkle(fragment);
						portal.tenant = fragment;
						fragment.x = portal.b.x;
						fragment.y = portal.b.y;	
						this.sparkle(fragment);
					}
					else if(dist(portal.b, fragment) < 20) {
						this.sparkle(fragment);
						portal.tenant = fragment;
						fragment.x = portal.a.x;
						fragment.y = portal.a.y;
						this.sparkle(fragment);
					} 	

				})
			}


		});
	}

model.rotateShipLeft = function() {
	this.ship.rotate = -ROT_SPEED;
}

model.rotateShipRight = function() {
	this.ship.rotate = ROT_SPEED;
}

model.stopShipRotate = function() {
	this.ship.rotate = 0;
}

model.fireGun = function() {
	this.projectiles.push({
		x : this.ship.x,
		y : this.ship.y,
		v : [PROJECTILE_VELOCITY*Math.cos(this.ship.phi),PROJECTILE_VELOCITY*Math.sin(this.ship.phi)],
		size : 6
	});
}

model.sparkle = function(loc) {
	for(var i=0; i<20; i++) {
		var v = 2.5*(1+Math.random())/2.0;
		var angle = Math.random()*6.28;
		this.particles.push({
			x : loc.x,
			y :  loc.y,
			lifespan : Math.random()*50,
			v : [v*Math.cos(angle), v*Math.sin(angle)]
		})
	}
}

model.die = function() {
	console.log('dying')
	this.state = 'dying';
	this.sparkle(this.ship);
}

model.win = function() {
	this.state = 'win';
}

model.start = function() {
	this.state = 'playing';
}
model.restart = function() {
	this.state = "stopped";
	this.loadLevel(this.levels[this.level]);
	this.start();
}

model.loadLevels = function(levels, startLevel) {
	this.levels = levels;
	this.level = startLevel || 0;
	this.loadLevel(this.levels[this.level]);
}

model.addPlanet = function(planetData) {
	var newPlanet = Object.assign({}, planetData);
	newPlanet.class = 'planet';
	this.planets.push(newPlanet)
}

model.addCloud = function(cloudData) {
	var newCloud = Object.assign({}, cloudData);
	newCloud.class = 'cloud';
	this.clouds.push(newCloud)
}

model.getProperties = function(obj) {
	switch(obj['class']) {
		case undefined:
			return []
			break;
		case 'planet':
			switch(obj.type) {
				case 'rock':
					return ['x','y','mass'];
					break;
				case 'cracked':
					return ['x','y', 'mass', 'angle'];
					break;
				default:
					return ['x','y','mass'];
					break;
			}
			break;
		case 'cloud':
			return ['x','y','drag'];
			break;
		case 'goal':
			return ['x','y'];
			break;
		case 'ship':
			return ['x','y', 'vx','vy'];
			break;
	}
}

model.loadLevel = function(level) {
	this.fragments = [];
	this.projectiles = [];
	this.particles = [];
	this.portals = level.portals || [];

	this.planets = [];
	(level.planets || []).forEach(planet => {
		this.addPlanet(planet);
	})

	this.clouds = [];
	(level.clouds || []).forEach(cloud => {
		this.addCloud(cloud);
	});

	this.goal = Object.assign({}, level.goal);
	
	this.ship.x = level.ship.x;
	this.ship.y = level.ship.y;
	this.ship.vx = level.ship.vx || 0;
	this.ship.vy = level.ship.vy || 0;	
	this.ship.theta = level.ship.theta || 0;
	this.ship.phi = level.ship.phi || 0;
	this.ship.mass = level.ship.mass || 1.0;
	this.title.text = level.name;
	this.title.lifespan = 3000;
}
model.getCurrentLevelState = function() {
	var state = {
		planets : [],
		portals : [],
		clouds : [],
		name : [],
		goal : null,
		ship : null,
		name : 'Untitled'
	};
	this.planets.forEach(planet => {
		state.planets.push(Object.assign({}, planet));
	})
	this.portals.forEach(portal => {
		state.portals.push(Object.assign({}, portal));
	})
	this.clouds.forEach(cloud => {
		state.clouds.push(Object.assign({}, cloud));
	})
	state.name = this.title.text;
	state.goal = Object.assign({}, this.goal);
	state.ship = Object.assign({}, this.ship);
	return state;

}
model.nextLevel = function() {
	this.level = (this.level + 1) % this.levels.length;
	this.loadLevel(this.levels[this.level]);
	this.start();
}
model.prevLevel = function() {
	this.level = (this.level - 1);
	if(this.level < 0) { this.level = this.levels.length-1; }
	this.loadLevel(this.levels[this.level]);
	this.start();
}

model.jumpToLevel = function(i) {
	this.level = i;
	if(i < this.levels.length) {
		this.loadLevel(this.levels[this.level]);
		this.start();
	}
}

model.showTitle = function(text, lifespan) {
	this.title.text = text;
	this.title.lifespan = lifespan;
}

model.getUID = function() {
	this.uid += 1;
	return this.uid;
}

model.pause = function() {
	this.savedState = this.state;
	this.state = 'paused';
}

model.resume = function() {
	this.state = this.savedState;
}

model.saveCurrentLevelState = function() {
	this.levels[this.level] = this.getCurrentLevelState();
}

model.newPlanet = function(x,y,mass,type) {
	switch(type) {
		case 'planet':
			var newPlanet = {x:x,y:y,mass:mass,type:'planet'}
			this.addPlanet(newPlanet);
			this.sparkle(newPlanet);
			break;
		case 'cracked':
			var newPlanet = {x:x,y:y,mass:mass,type:'cracked',angle:0, v: 0.05}
			this.addPlanet(newPlanet);			
			this.sparkle(newPlanet);
			break;

		case 'rock':
			var newPlanet = {x:x,y:y,mass:mass,type:'rock'}
			this.addPlanet(newPlanet);			
			this.sparkle(newPlanet);
			break;

	}
}

model.newCloud = function(x,y,drag) {
	var newCloud = {x:x,y:y,drag:drag}
	this.clouds.push(newCloud);
	this.sparkle(newCloud);
}

