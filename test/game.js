function Game(viewport)
{
        if (!viewport)
        {
                console.log("Error: No viewport specified.");
                return;
        }

        this.robots = [Robot.load(pixie), Robot.load(dixie)];
        this.arena = Arena.load(arena);
        this.umpire = new Umpire(this.robots[0], this.robots[1], this.arena);
        this.renderer = new Renderer(viewport);
        this.painter = new Painter(this.renderer);
        this.last_loop = Utility.get_time();

        setInterval(this.loop.bind(this), 16.66);
};


Game.prototype.loop = function()
{
        var now = Utility.get_time();
        var dt = now - this.last_loop;

        this.renderer.clear_screen();

        this.umpire.advance(dt);

        if (!__debug)
        {

                this.painter.draw_sprite(this.arena.get_frame(), this.arena.get_sprite());
                this.painter.draw_particles(this.robots[0].get_chasis().get_skidmark()[0]);
                this.painter.draw_particles(this.robots[0].get_chasis().get_skidmark()[1]);
                this.painter.draw_particles(this.robots[1].get_chasis().get_skidmark()[0]);
                this.painter.draw_particles(this.robots[1].get_chasis().get_skidmark()[1]);
                this.painter.draw_sprite(this.robots[0].get_chasis().get_frame(), this.robots[0].get_chasis().get_sprite());
                this.painter.draw_sprite(this.robots[1].get_chasis().get_frame(), this.robots[1].get_chasis().get_sprite());

                this.painter.draw_particles(this.robots[0].get_chasis().get_fire());
                this.painter.draw_particles(this.robots[0].get_chasis().get_smoke());
                this.painter.draw_particles(this.robots[1].get_chasis().get_fire());
                this.painter.draw_particles(this.robots[1].get_chasis().get_smoke());

                var p = this.umpire.get_projectiles();
                for (var i = 0; i < p.length; i++)
                {
                        this.painter.draw_sprite(p[i].projectile.get_frame(), p[i].projectile.get_sprite());
                }

                this.painter.draw_sprite(this.robots[0].get_weapon().get_frame(), this.robots[0].get_weapon().get_sprite());
                this.painter.draw_sprite(this.robots[1].get_weapon().get_frame(), this.robots[1].get_weapon().get_sprite());
        } 
        else 
        {

                this.painter.colour.set_values(1.0, 0.5, 0.0, 1.0);
                this.painter.draw_polygon(this.arena.get_bounds());
                this.painter.colour.set_values(1.0, 0.5, 0.5, 1.0);
                this.painter.draw_polygon(this.robots[0].chasis.get_bounds());
                this.painter.draw_polygon(this.robots[1].chasis.get_bounds());
                this.painter.colour.set_values(0.5, 0.5, 1.0, 1.0);
                this.painter.draw_quad(this.robots[0].chasis.get_frame());
                this.painter.draw_quad(this.robots[1].chasis.get_frame());
                this.painter.colour.set_values(0.5, 1.0, 0.5, 1.0);
                this.painter.draw_quad(this.robots[0].weapon.get_frame());
                this.painter.draw_quad(this.robots[1].weapon.get_frame());

                this.painter.colour.set_values(1.0, 0.0, 0.0, 1.0);
                var p = this.umpire.get_projectiles();
                for (var i = 0; i < p.length; i++)
                {
                        this.painter.draw_quad(p[i].projectile.get_frame(), p[i].projectile.get_frame());
                }
        }

        this.last_loop = now;
        
};
