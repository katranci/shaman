/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        particle class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Particle()
{
        this.life = 0;       
        this.life_left = 0;    
        this.position = new Vector2(0.0, 0.0);
        this.scale = 0;      
        this.alpha = 0;
        this.distance = new Vector2(0.0, 0.0);
        this.velocity = new Vector2(0.0, 0.0);  
        this.initial_alpha = 0;
        this.final_alpha = 0; 
        this.initial_scale = 0;
        this.final_scale = 0;
        this.tile_index = 0;
};

Particle.prototype.spawn = function(lifetime, x, y, scale_i, scale_f, alpha_i, alpha_f, angle, speed, tile)
{
        this.life = lifetime;
        this.life_left = lifetime;
        this.position.set_values(x, y);
        this.scale = scale_i;
        this.initial_scale = scale_i;
        this.final_scale = scale_f;
        this.alpha = alpha_i;
        this.initial_alpha = alpha_i;
        this.final_alpha = alpha_f;
        this.velocity.set_values(0.0, -1.0);
        this.velocity.rotate(angle);
        this.velocity.mul_s(this.velocity, speed);
        this.tile_index = tile;
};

Particle.prototype.advance = function(dt)
{
        this.distance.set_values(0.0, 0.0);
        this.distance.lerp(this.distance, this.velocity, dt/1000.0);
        this.position.add(this.position, this.distance);
        this.scale = MathLib.lerp(this.initial_scale, this.final_scale, (this.life - this.life_left) / this.life);
        this.alpha = MathLib.lerp(this.initial_alpha, this.final_alpha, (this.life - this.life_left) / this.life);
        this.life_left -= dt; 
};

Particle.prototype.get_life = function()
{
        return this.life;
};

Particle.prototype.get_life_left = function()
{
        return this.life_left;
};

Particle.prototype.get_position = function()
{
        return this.position;
};

Particle.prototype.get_scale = function()
{
        return this.scale;
};

Particle.prototype.get_alpha = function()
{
        return this.alpha;
};

Particle.prototype.get_velocity = function()
{
        return new Vector2(this.velocity.get(0), this.velocity.get(1));
};

Particle.prototype.get_tile_index = function()
{
        return this.tile_index;
};
