function Weapon()
{
        this.target_rotation = 0;

        this.sprite;
        this.frame;
        this.position;
        this.traverse_speed;
        this.projectile;
};

Weapon.load = function(data)
{
        var new_weapon = new Weapon();
        new_weapon.sprite = new Sprite(data.sprite.width, data.sprite.height, data.sprite.image);
        new_weapon.sprite.generate_tiles(data.sprite.tiles.vertical, data.sprite.tiles.horizontal, data.sprite.tiles.count);
        new_weapon.frame = new Quad(data.frame.x,                    data.frame.y,
                                    data.frame.x + data.frame.width, data.frame.y,
                                    data.frame.x + data.frame.width, data.frame.y + data.frame.height,
                                    data.frame.x,                    data.frame.y + data.frame.height);
        new_weapon.position = new_weapon.frame.centre();
        new_weapon.traverse_speed = data.stats.traverse_speed;
        new_weapon.projectile = Projectile.load(data.projectile);
        new_weapon.projectile.get_sprite().start_animation(200);
        return new_weapon;
};

Weapon.prototype.update_rotation = function(dt)
{
        var target;
        var energy = Math.abs(this.target_rotation);
        if (!MathLib.fequals(energy, 0.0, MathLib.epsilon))
        {

                target = this.traverse_speed * (dt/1000) * ((this.target_rotation > 0.0)?(1.0):(-1.0));
                if (energy < Math.abs(target))
                {
                        target = this.target_rotation;
                        this.target_rotation = 0;
                }
                else 
                {
                        this.target_rotation -= target;
                }

                var x = this.position.get(0);
                var y = this.position.get(1);
                this.frame.rotate_about(target, x, y);
                this.projectile.rotate(target);
        }  
};

Weapon.prototype.move = function(x, y)
{
        this.frame.translate(x, y);
        this.position.add(this.position, new Vector2(x, y));
        this.projectile.move(x, y);
}

Weapon.prototype.set_target_rotation = function(angle)
{       
        this.target_rotation = angle;
};

Weapon.prototype.get_frame = function()
{
        return this.frame;
};

Weapon.prototype.get_sprite = function()
{
        return this.sprite;
};

Weapon.prototype.get_position = function()
{
        return this.position;
};

Weapon.prototype.get_target_rotation = function(angle)
{       
        return this.target_rotation;
};

Weapon.prototype.get_projectile = function()
{       
        return this.projectile;
};