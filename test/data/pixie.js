var pixie  = 
{
        "stats":
        {
                "max_hp": 100,
                "accuracy": 2,
                "attack_speed": 1000,
                "probe_speed": 6000,
                "attack_power": 5,
                "min_range": 200,
                "max_range": 600
        },
        "chasis": 
        {
                "sprite":
                {
                        "image": "data/asset/pixie.png",                  
                        "width": 128,
                        "height": 128
                },
                "frame":
                {
                        "x": 0,
                        "y": 0,
                        "width": 128,
                        "height": 128
                },
                "stats":
                {
                        "speed": 300,
                        "traverse_speed": 300
                },
                "bounds": 
                [
                        22, 38,
                        45, 17,
                        85, 17,
                        108, 36,
                        116, 65,
                        102, 97,
                        80, 112,
                        40, 110,
                        13, 79
                ]
        },
        "weapon": 
        {
                "sprite":
                {
                        "image": "data/asset/twirl.png",                  
                        "width": 512,
                        "height": 512,
                        "tiles": 
                        {
                                "vertical": 4,
                                "horizontal": 4,
                                "count": 10
                        }
                },
                "frame":
                {
                        "x": 0,
                        "y": 0,
                        "width": 128,
                        "height": 128
                },
                "stats":
                {
                        "traverse_speed": 180
                },
                "projectile":
                {
                        "speed": 800,
                        "sprite":
                        {
                                "image": "data/asset/beam.png",                  
                                "width": 128,
                                "height": 128,
                                "tiles": 
                                {
                                        "vertical": 2,
                                        "horizontal": 4,
                                        "count": 7
                                }
                        },
                        "frame":
                        {
                                "x": 48,
                                "y": 32,
                                "width": 32,
                                "height": 64
                        },
                }
        }
};