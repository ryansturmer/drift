var levels = [
	{
		name : "Bereft",
		planets : [ 
			{
				x : 700,
				y : 200,
				mass : 250
			},
		],
		goal : {
			x : 1100,
			y : 350
		},
		ship : {
			x : 150,
			y : 550,
			vx : 0.05,
			vy : 0.01
		}
	},
	{
		name : "Balance",
		planets : [ 
		{
			x : 550,
			y : 100,
			mass : 150
		},
		{
			x : 850,
			y : 500,
			mass : 150
		}
		
		],

		goal : {
			x : 1100,
			y : 300
		},
		ship : {
			x : 50,
			y : 300,
			vx : 0.03, 
			vy : 0,
			mass : 1,
			theta : 0,
			phi : 0,
			rotate : 0,
		},
	},
	{
		name : "Three",
		planets : [ 
			{
				x : 600,
				y : 300,
				mass : 100
			},
			{
				x : 100,
				y : 300,
				mass : 60
			},		
					{
				x : 1000,
				y : 300,
				mass : 35,
				type : 'rock'
			},		
		],
		goal : {
			x : 1100,
			y : 300
		},
		ship : {
			x : 50,
			y : 50,
			vx : 0.06, 
			vy : -0.005,
			mass : 1,
			theta : 0.3,
			phi : -0.4,
			rotate : 0,
		},
	},
	{
		name : "The Eight Escape",
		planets : [ 
			{
				x : 400,
				y : 300,
				mass : 300
			},
			{
				x : 800,
				y : 300,
				mass : 300
			},		
		],
		goal : {
			x : 600,
			y : 550
		},
		ship : {
			x : 600,
			y : 300,
			vx : 0.15, 
			vy : -0.2,
			mass : 1,
			theta : 0.3,
			phi : -0.4,
			rotate : 0,
		},
	},

	{
		name : "Bedlam",
		planets : [ 
			{
				x : 200,
				y : 350,
				mass : 200
			},
			{
				x : 850,
				y : 200,
				mass : 200
			},		
			{
				x : 600,
				y : 400,
				mass : 400
			},
			{
				x : 900,
				y : 450,
				type : 'rock',
				mass : 200
			}
		],
		goal : {
			x : 1000,
			y : 400
		},
		ship : {
			x : 50,
			y : 50,
			vx : 0.09, 
			vy : 0.05,
			mass : 1,
			theta : 0,
			phi : 2.5,
			rotate : 0,
		},
	},

	{
		name : "Purple Haze",
		planets : [
			{
				x : 300,
				y : 300,
				mass : 100
			},
			{
				x : 800,
				y : 400,
				mass : 200,
				type : 'rock'
			},


			{
				x : 800,
				y : 200,
				mass : 150

			}

		],
		clouds : [
			{
				x : 600,
				y : 440,
				drag : 0.04
			}
		],
		goal : {
			x : 1000,
			y : 450
		},
		ship : {
			x : 100,
			y : 150,
			vx : 0.1, 
			vy : 0,
			mass : 1,
			theta : 0,
			phi : 0,
			rotate : 0,
		},
	},
{
		name : "Broken",
		planets : [
			{
				x : 600,
				y : 300,
				mass : 150,
				type : 'cracked',
				angle : 0.5,
				v : 0.08
			}
		],
		clouds : [],
		goal : {
			x : 1000,
			y : 300
		},
		ship : {
			x : 100,
			y : 75,
			vx : 0.05, 
			vy : 0,
			mass : 1,
			theta : 0,
			phi : -0.5,
			rotate : 0,
		},
	},

	{
		name : "Finesse",
		planets : [
			{
				x : 400,
				y : 292,
				mass : 200,
				type : 'planet',
				angle : 0,
				v : 0.04
			},

			{
				x : 800,
				y : 308,
				mass : 150,
				type : 'cracked',
				angle : 0,
				v : 0.04
			},

			{
				x : 550,
				y : 480,
				mass : 10,
				type : 'rock',
				angle : 0,
				v : 0.04
			}

		],
		clouds : [],
		goal : {
			x : 400,
			y : 500
		},
		ship : {
			x : 1000,
			y : 75,
			vx : -0.05, 
			vy : 0,
			mass : 1,
			theta : 0,
			phi : -2,
			rotate : 0,
		},
	},

	{
		name : "The Iron Curtain",
		planets : [
			{
				x : 300,
				y : 200,
				mass : 150,
				type : 'planet',
				angle : 3.14/2.0,
				v : 0.04
			},
			{
				x : 500,
				y : 450,
				mass : 150,
				type : 'planet',
			},
			{
				x : 1015,
				y : 530,
				mass : 20,
				type : 'rock',
			},
			{
				x : 870,
				y : 325,
				mass : 150,
				type : 'cracked',
				angle : 90*180/Math.PI,
				v : 0.08
			},

		],

		clouds : [
			{ x : 650, y : -28, drag : 0.08 },		
			{ x : 650, y : 36, drag : 0.08 },		
			{ x : 650, y : 100, drag : 0.08 },
			{ x : 650, y : 164, drag : 0.08 },
			{ x : 650, y : 228, drag : 0.08 },
			{ x : 650, y : 292, drag : 0.08 },
			{ x : 650, y : 356, drag : 0.08 },
			{ x : 650, y : 420, drag : 0.08 },
			{ x : 650, y : 484, drag : 0.08 },
			{ x : 650, y : 548, drag : 0.08 },
			{ x : 650, y : 612, drag : 0.08 },

		],
		goal : {
			x : 1100,
			y : 500
		},
		ship : {
			x : 50,
			y : 350,
			vx : 0.01, 
			vy : 0.01,
			mass : 1,
			theta : 0,
			phi : -2,
			rotate : 0,
		},
	},

	{
		name : "Still Alive",
		planets : [
			{
				x : 600,
				y : 292,
				mass : 200,
				type : 'planet',
				angle : 0,
				v : 0.04
			},
			{
				x : 175,
				y : 450,
				mass : 75,
				type : 'rock',
				angle : 0,
				v : 0.04
			},
		],
		portals : [
			{
				a : {x : 100, y : 100},
				b : {x :535, y:550}
			}
		],
		clouds : [

		],
		goal : {
			x : 100,
			y : 200
		},
		ship : {
			x : 1000,
			y : 75,
			vx : -0.1, 
			vy : 0,
			mass : 1,
			theta : 0,
			phi : -2,
			rotate : 0,
		}},

		{
		name : "Untitled",
		planets : [
			{
				x : 800,
				y : 100,
				mass : 250,
				type : 'cracked',
				angle : 0,
				v : 0.09
			},
			{
				x : 265,
				y : 400,
				mass : 150,
				type : 'planet',
				angle : 0,
				v : 0.04
			},/*
			{
				x : 135,
				y : 250,
				mass : 20,
				type : 'rock',
			}*/

		],
		portals : [
			{
				a : {x : 1020, y : 100},
				b : {x :300, y:300}
			}
		],
		clouds : [
			{
				x : 135,
				y : 260,
				drag : 0.15
			},
			{
				x : 75,
				y : 260,
				drag : 0.15
			}


		],
		goal : {
			x : 95,
			y : 185
		},
		ship : {
			x : 875,
			y : 530,
			vx : -0.03, 
			vy : 0,
			mass : 1,
			theta : 0,
			phi : -2,
			rotate : 0,
		},
	},
]