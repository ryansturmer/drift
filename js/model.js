var model = {
	ship : {
		x : window.innerWidth/10.0,
		y : window.innerHeight/2.0,
		v : [0.05,0.0],
		mass : 1,
		theta : 0,
		phi : 0,
		rotate : 0,
		},
	planets : [ 
		{
			x : window.innerWidth/2.0,
			y : window.innerHeight/4,
			mass : 150
		},
		{
			x : 3*window.innerWidth/4.0,
			y : 3*window.innerHeight/4,
			mass : 100
		}
		
	],

	goal : {
		x : 9.0*window.innerWidth/10.0,
		y : window.innerHeight/2.0
	},

	projectiles : [],

	ts : null
};

model.update = function(ts) {
		if(this.ts === null) {
			this.ts = ts;
			return;
		}

		if(this.state == 'dead' || this.state == 'win') { return; }
		var ship = this.ship;

		// Update time
		dt = ts - this.ts;
		this.ts = ts;

		// Projectile-planet collision
		this.projectiles.forEach(projectile => {
			this.planets.forEach((planet, idx) =>  {
				if(dist(projectile, planet) < 32) {
					this.planets.splice(idx, 1);
				}
			});
		});

		// Planet-ship collision
		this.planets.forEach(planet => {
			if(dist(ship, planet) < 32) {
				this.die();
			}
		});

			if(dist(ship, this.goal) < 20) {
				this.win();
			}

		// Ship movement
		this.planets.forEach(function(planet) {
			var r = dist(planet, ship);
			var ru = [(planet.x - ship.x) / r, (planet.y - ship.y) / r] 
			var f = G*ship.mass*planet.mass/(r*r);
			var a = f*ship.mass;
			var dv = [ru[0]*a*dt, ru[1]*a*dt]
			ship.v[0] += dv[0]
			ship.v[1] += dv[1]
		});
		ship.x += ship.v[0]*dt;
		ship.y += ship.v[1]*dt;

		// Projectile motion
		this.projectiles.forEach(function(projectile) {
			projectile.x += projectile.v[0]*dt;
			projectile.y += projectile.v[1]*dt;			
		});

		// Ship rotation
		this.ship.phi += this.ship.rotate*dt;


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