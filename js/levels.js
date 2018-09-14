var levels = [
	{
		name : "Intro",
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
				mass : 35
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
		name : "Bereft",
		planets : [ 
		{
			x : 600,
			y : 100,
			mass : 100
		},
		{
			x : 800,
			y : 500,
			mass : 100
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
	}
]