function Chasis()
{
        this.angle = 0;
        this.target_rotation = 0;

        this.sprite;
        this.frame;
        this.bounds;
        this.bbox;
        this.position;
        this.speed;
        this.traverse_speed;
        this.skidmark = [];
        this.fire;
        this.smoke;

};

Chasis.load = function(data)
{
        var new_chasis = new Chasis();
        new_chasis.sprite = new Sprite(data.sprite.width, data.sprite.height, data.sprite.image);
        new_chasis.sprite.generate_tiles(1, 1, 1);
        new_chasis.frame = new Quad(data.frame.x,                    data.frame.y,
                                    data.frame.x + data.frame.width, data.frame.y,
                                    data.frame.x + data.frame.width, data.frame.y + data.frame.height,
                                    data.frame.x,                    data.frame.y + data.frame.height);
        new_chasis.bounds = new Polygon();
        new_chasis.bounds.insert_array(data.bounds);
        new_chasis.bbox = new_chasis.bounds.get_aabb();
        new_chasis.position = new_chasis.frame.centre();
        new_chasis.speed = data.stats.speed;
        new_chasis.traverse_speed = data.stats.traverse_speed;
        new_chasis.skidmark[0] = Emitter.load(scar);
        new_chasis.skidmark[1] = Emitter.load(scar);
        new_chasis.skidmark[0].start();
        new_chasis.skidmark[1].start();
        new_chasis.skidmark[0].translate(16, 0);
        new_chasis.skidmark[1].translate(-16, 0);
        new_chasis.fire = Emitter.load(smoke);
        new_chasis.smoke = Emitter.load(fire);
        return new_chasis;
};

Chasis.prototype.update_rotation = function(dt)
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
                this.bounds.rotate_about(target, x, y);
                this.bbox.rotate_about(target, x, y);
                this.frame.rotate_about(target, x, y);
                this.skidmark[0].rotate_about(target, x, y);
                this.skidmark[1].rotate_about(target, x, y);
                this.fire.rotate_about(target, x, y);
                this.smoke.rotate_about(target, x, y);
        }  
};

Chasis.prototype.move = function(x, y)
{
        this.bounds.translate(x, y);
        this.bbox.translate(x, y);
        this.frame.translate(x, y);
        this.position.add(this.position, new Vector2(x, y));
        this.skidmark[0].translate(x, y);
        this.skidmark[1].translate(x, y);
        this.fire.translate(x, y);
        this.smoke.translate(x, y);
}

Chasis.prototype.set_target_rotation = function(angle)
{       
        this.target_rotation = angle;
};

Chasis.prototype.get_frame = function()
{
        return this.frame;
};

Chasis.prototype.get_sprite = function()
{
        return this.sprite;
};

Chasis.prototype.get_bounds = function()
{
        return this.bounds.get_copy();
};

Chasis.prototype.get_bbox = function()
{
        return this.bbox.get_copy();
};

Chasis.prototype.get_position = function()
{
        return this.position;
};

Chasis.prototype.get_speed = function()
{
        return this.speed;
};

Chasis.prototype.get_target_rotation = function(angle)
{       
        return this.target_rotation;
}; 

Chasis.prototype.get_skidmark = function()
{
        return this.skidmark;
};

Chasis.prototype.get_fire = function()
{
        return this.fire;
};

Chasis.prototype.get_smoke = function()
{
        return this.smoke;
};