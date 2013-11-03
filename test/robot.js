function Robot()
{
        this.chasis;
        this.weapon;

        this.max_hp = 0;
        this.accuracy = 0;
        this.attack_speed = 0;
        this.probe_speed = 0;
        this.attack_power = 0;
        this.min_range = 0;
        this.max_range = 0;

        this.hp = 0;
        this.probe_cooldown = 0;
        this.attack_cooldown = 0;
        this.weapon_cooldown = 0;

        this.enemy;
        this.arena;
        this.umpire;

        this.template;
        this.status;
};

Robot.COOLDOWN = 0;
Robot.SHOOTING = 1;

Robot.load = function(data)
{
        var new_robot = new Robot();
        new_robot.chasis = Chasis.load(data.chasis);
        new_robot.weapon = Weapon.load(data.weapon);
        new_robot.max_hp = data.stats.max_hp;
        new_robot.accuracy = data.stats.accuracy;
        new_robot.attack_speed = data.stats.attack_speed;
        new_robot.probe_speed = data.stats.probe_speed;
        new_robot.attack_power = data.stats.attack_power;
        new_robot.min_range = data.stats.min_range;
        new_robot.max_range = data.stats.max_range;
        new_robot.hp = new_robot.max_hp;
        new_robot.probe_cooldown = 0;
        new_robot.status = Robot.COOLDOWN;
        new_robot.template = data;
        return new_robot;
};

Robot.prototype.get_chasis = function()
{
        return this.chasis;
};

Robot.prototype.get_weapon = function()
{
        return this.weapon;
};

Robot.prototype.get_status = function()
{
        return this.status;
};

Robot.prototype.get_template = function()
{
        return this.template;
};

Robot.prototype.get_enemy = function()
{
        return this.enemy;
};  

Robot.prototype.set_status = function(status)
{
        this.status = status;
};

Robot.prototype.set_match_params = function(enemy, arena, umpire, start_position, start_angle)
{
        this.enemy = enemy;
        this.arena = arena;
        this.chasis.move(start_position.get(0), start_position.get(1));
        this.weapon.move(start_position.get(0), start_position.get(1));
        this.umpire = umpire;
};

Robot.prototype.advance = function(dt)
{
        this.probe_cooldown -= dt;
        if (this.attack_cooldown > 0)
        {
                this.attack_cooldown -= dt;
        }
        if (this.weapon_cooldown > 0)
        {
                this.weapon_cooldown -= dt;
        }

        var target = new Vector2();
        target.sub(this.chasis.get_position(), this.enemy.get_chasis().get_position());
        var distance = target.len();
        target.normalize();

        /* chasis probe */
        if (this.probe_cooldown <= 0)
        {
                if (distance < this.min_range || distance > this.max_range)
                {
                        var target_angle = target.angle(this.chasis.get_bbox().direction());
                        target_angle += ((target_angle < 0)?(180):(-180));                   
                        if (distance < this.min_range)
                        {
                                target_angle += 180;
                        }
                        this.chasis.set_target_rotation(target_angle);     
                }
                this.probe_cooldown = this.probe_speed;
        }

        this.chasis.update_rotation(dt);

        /* weapon probe */
        var weapon_target_angle = target.angle(this.weapon.get_frame().direction());
        weapon_target_angle += ((weapon_target_angle < 0)?(180):(-180));
        this.weapon.set_target_rotation(weapon_target_angle);
        this.weapon.update_rotation(dt);        

        /* attack if possible */
        if (this.attack_cooldown <= 0 && distance >= this.min_range && distance <= this.max_range)
        {
                this.weapon.get_sprite().start_animation(400, 1);
                this.attack_cooldown = this.attack_speed;
                this.weapon_cooldown = 400;
                this.status = Robot.SHOOTING;
        }

        if (this.status === Robot.SHOOTING && this.weapon_cooldown <= 0)
        {
                this.umpire.spawn_projectile(this);
                this.status = Robot.COOLDOWN;
        }

        /* resolve collision */
        var good_to_go = true;
        var not_rotating = MathLib.fequals(this.chasis.get_target_rotation(), 0.0, MathLib.epsilon);
       
        /* calculate robot's velocity */
        var chasis_bbox = this.chasis.get_bbox();
        var velocity = chasis_bbox.direction();
        velocity.mul_s(velocity, this.chasis.get_speed() * dt/1000);

        /* get robot's next position  */
        var chasis_bounds = this.chasis.get_bounds();
        chasis_bounds.translate(velocity.get(0), velocity.get(1));

        /* resolve collision with environment */
        if (this.arena.get_bounds().is_polygon_colliding(chasis_bounds))
        {
                good_to_go = false;
                if (not_rotating) 
                {
                        this.chasis.set_target_rotation(180 * Utility.flip_coin(-1, 1));                    
                }
        }

        /* resolve collision with enemy */
        if (this.enemy.get_chasis().get_bounds().is_polygon_colliding(chasis_bounds))
        {
                good_to_go = false;
                if (not_rotating) 
                {
                        this.chasis.set_target_rotation(Utility.rand_range(100, 150) * Utility.flip_coin(-1, 1));                    
                }
         }

        /* move robot if nothing's colliding */
        if (good_to_go)
        {
                this.chasis.move(velocity.get(0), velocity.get(1));
                this.weapon.move(velocity.get(0), velocity.get(1));
                this.chasis.get_skidmark()[0].advance(dt);
                this.chasis.get_skidmark()[1].advance(dt);
        }

        /* give robot a random rotation every now and then */
        if(good_to_go && not_rotating)
        {
                var condition = ((Utility.rand_int_range(0, 100) > 96)?(1):(0));
                var amount = Utility.rand_range(10, 30);
                var sign = Utility.flip_coin(-1, 1);
                this.chasis.set_target_rotation(condition * amount * sign);
        }

        this.weapon.get_sprite().advance(dt);
        this.chasis.get_fire().advance(dt);
        this.chasis.get_smoke().advance(dt);
        this.weapon.get_projectile().get_sprite().advance(dt);
};