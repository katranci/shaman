var dixie  = 
{
        "stats":
        {
                "max_hp": 100,
                "accuracy": 2,
                "attack_speed": 2000,
                "probe_speed": 6000,
                "attack_power": 5,
                "min_range": 300,
                "max_range": 800
        },
        "chasis": 
        {
                "sprite":
                {
                        "image": "game/data/asset/dixie.png",                  
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
                        "speed": 150,
                        "traverse_speed": 180
                },
                "bounds": 
                [
                        7, 43,
                        21, 20,
                        47, 5,
                        86, 8,
                        115, 29,
                        126, 65,
                        117, 95,
                        86, 122,
                        44, 120,
                        10, 93,
                        2, 65
                ]
        },
        "weapon": 
        {
                "sprite":
                {
                        "image": "game/data/asset/rifle.png",                  
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
                        "speed": 1500,
                        "sprite":
                        {
                                "image": "game/data/asset/bullet.png",                  
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
        },
};