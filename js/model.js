var model = {
	ship : {
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
	title : {
		text : '',
		lifespan : 0
	},
	level : 0
};

model.update = function(ts) {
		if(this.ts === null) {
			this.ts = ts;
			return;
		}

		if(this.state != 'playing') { this.ts = null; return; }
		var ship = this.ship;

		// Update time
		dt = ts - this.ts;
		this.ts = ts;

		// Projectile-planet collision
		this.projectiles.forEach((projectile, projectile_idx) => {
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
								this.fragments.push({
									x : planet.x  + 16*Math.cos(angle),
									y : planet.y + 16*Math.sin(angle),
									v : [Math.cos(angle)*planet.v, Math.sin(angle)*planet.v],
									mass : planet.mass/2.0
								});
								this.fragments.push({
									x : planet.x  + -16*Math.cos(angle),
									y : planet.y + -16*Math.sin(angle),
									v : [-Math.cos(angle)*planet.v, -Math.sin(angle)*planet.v],
									mass : planet.mass/2.0
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

		// Fragment-ship collision
		this.fragments.forEach(fragment => {
			if(dist(ship, fragment) < 16) {
				this.die();
			}
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
			ship.v[0] += dv[0]
			ship.v[1] += dv[1]
		});

		console.log(this.fragments)
		this.fragments.forEach(fragment => {
			var r = dist(fragment, ship);
			var ru = [(fragment.x - ship.x) / r, (fragment.y - ship.y) / r] 
			var f = G*ship.mass*fragment.mass/(r*r);
			var a = f*ship.mass;
			var dv = [ru[0]*a*dt, ru[1]*a*dt]
			ship.v[0] += dv[0]
			ship.v[1] += dv[1]
		});

		this.fragments.forEach(fragment => {
			fragment.x += fragment.v[0]*dt;
			fragment.y += fragment.v[1]*dt;
		});

		this.clouds.forEach(cloud => {
			if(dist(ship, cloud) < 32) {
				/*var f = cloud.drag;
				var a = f*ship.mass;
				var sv = Math.sqrt(ship.v[0]**2 + ship.v[1]**2)
				var su = [ship.v[0]/sv, ship.v[1]/sv]
				var dv = [su[0]*a*dt, su[1]*a*dt]
				ship.v[0] -= dv[0];
				ship.v[1] -= dv[1];
				*/
				ship.v[0] = ship.v[0] * (1-cloud.drag)
				ship.v[1] = ship.v[1] * (1-cloud.drag)
			}
		});

		ship.x += ship.v[0]*dt;
		ship.y += ship.v[1]*dt;

		// Projectile motion
		this.projectiles.forEach(projectile => {
			/*this.clouds.forEach(cloud => {
				if(dist(projectile, cloud) < 32) {
					projectile.v[0] = projectile.v[0] * (1-cloud.drag)
					projectile.v[1] = projectile.v[1] * (1-cloud.drag)
				}
			});*/
			projectile.x += projectile.v[0]*dt;
			projectile.y += projectile.v[1]*dt;	
		});

		this.particles.forEach((particle, idx) => {
			particle.x += particle.v[0]*dt;
			particle.y += particle.v[1]*dt;
			particle.lifespan -= dt;
			if(particle.lifespan <= 0) {
				this.particles.splice(idx, 1);
			}
		});

		// Ship rotation
		this.ship.phi += this.ship.rotate*dt;

		if(this.title.lifespan > 0) {
			this.title.lifespan -= dt;
		}
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

model.die = function() {
	this.state = 'dead';
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

model.loadLevel = function(level) {
	this.planets = [];
	this.fragments = [];
	this.projectiles = [];
	this.particles = [];
	level.planets.forEach(planet => {
		this.planets.push(planet);
	})

	this.clouds = [];
	(level.clouds || []).forEach(cloud => {
		this.clouds.push(cloud);
	});

	//this.planets = level.planets;
	this.goal = level.goal;
	this.ship.x = level.ship.x;
	this.ship.y = level.ship.y;
	if(level.ship.v) {
		this.ship.v = [level.ship.v[0], level.ship.v[1]];
	}

	this.ship.theta = level.ship.theta || 0;
	this.ship.phi = level.ship.phi || 0;
	this.ship.mass = level.ship.mass || 1.0;
	this.title.text = level.name;
	this.title.lifespan = 3000;
}

model.nextLevel = function() {
	this.level = (this.level + 1) % this.levels.length;
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