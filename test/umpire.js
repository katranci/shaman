function Umpire(robot1, robot2, arena)
{
        this.robots = [robot1, robot2];
        this.arena = arena;
        this.robots[0].set_match_params(this.robots[1], this.arena, this, new Vector2(360, 640 + 64));
        this.robots[1].set_match_params(this.robots[0], this.arena, this, new Vector2(1560, 640 + 64));
        this.projectiles = [];
};

Umpire.prototype.advance = function(dt)
{
        this.robots[0].advance(dt);
        this.robots[1].advance(dt);
        var hit = false;

        for (var i = 0; i < this.projectiles.length; i++)
        {
                var path = this.projectiles[i].projectile.advance(dt);
                if (this.arena.get_bounds().is_line_colliding(path))
                {
                        hit = true;
                }
                if (this.projectiles[i].target.get_chasis().get_bounds().is_line_colliding(path))
                {
                        //this.projectiles[i].target.damage(this.projectiles[i].target.get_enemy().get_attack_power());
                        hit = true;
                        var burn = Utility.rand_int_range(0, 100);
                        if (burn > 80)
                        {
                            this.projectiles[i].target.get_chasis().get_fire().start(2000);
                            this.projectiles[i].target.get_chasis().get_smoke().start(2000);
                        }
                }

                if (hit) 
                {
                        this.projectiles.splice(i, 1);
                }
        }
};

Umpire.prototype.spawn_projectile = function(robot)
{
        var new_projectile = Projectile.load(robot.get_template().weapon.projectile);
        var frame = robot.get_weapon().get_projectile().get_frame();
        new_projectile.get_frame().set(frame.get_corner(0).get(0), frame.get_corner(0).get(1), 
                                       frame.get_corner(1).get(0), frame.get_corner(1).get(1), 
                                       frame.get_corner(2).get(0), frame.get_corner(2).get(1), 
                                       frame.get_corner(3).get(0), frame.get_corner(3).get(1));
        this.projectiles.push({"target": robot.get_enemy(), "projectile": new_projectile});
};

Umpire.prototype.get_projectiles = function()
{
        return this.projectiles;
};