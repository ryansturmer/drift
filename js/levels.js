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
			v : [0.05,0.01],
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
			v : [0.03,0.0],
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
			v : [0.06,-0.005],
			mass : 1,
			theta : 0.3,
			phi : -0.4,
			rotate : 0,
		},
	},
	{
		name : "Untitled",
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
			v : [0.15,-0.2],
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
				mass : 100
			}
		],
		goal : {
			x : 1000,
			y : 400
		},
		ship : {
			x : 50,
			y : 50,
			v : [0.09,0.05],
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
			v : [0.1,0.0],
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
			v : [0.05,0.0],
			mass : 1,
			theta : 0,
			phi : -0.5,
			rotate : 0,
		},
	},

	{
		name : "Untitled",
		planets : [
			{
				x : 400,
				y : 292,
				mass : 200,
				type : 'cracked',
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
			v : [-0.05,0.0],
			mass : 1,
			theta : 0,
			phi : -2,
			rotate : 0,
		},
	}
]