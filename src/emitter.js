function Emitter(capacity)
{
        this.capacity = capacity;
        this.vertex_data = new Array(capacity * 40);
        this.index_data = [];
        this.particles = [];
        this.spawn_countdown = 0;
        
        this.fuel;
        this.frequency;
        this.density;
        this.life_min;  
        this.life_max;
        this.speed_min;
        this.speed_max;
        this.angle_min;
        this.angle_max;
        this.initial_scale_min;
        this.initial_scale_max;
        this.final_scale_min;
        this.final_scale_max;
        this.initial_alpha_min;  
        this.initial_alpha_max;  
        this.final_alpha_min;   
        this.final_alpha_max;  
        this.spawn_area;
        this.sprite;

        for (var i = 0; i < capacity; i++)
        {
                this.particles.push(new Particle());
        }

};

Emitter.prototype.advance = function(dt)
 {
         var spawns_left = 0;
         var vertex_coefs = [-1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0];
         var indices = [0, 1, 2, 0, 2, 3];
         var tex_coords;
         var cx = this.spawn_area.get_centre().get(0);
         var cy = this.spawn_area.get_centre().get(1);
         var radius = this.spawn_area.get_radius();
         this.spawn_countdown -= dt;
         this.index_data.length = 0;
         if (this.spawn_countdown <= 0 && this.fuel !== 0)
         {
                 this.spawn_countdown = this.frequency + this.spawn_countdown;
                 spawns_left = this.density;
         }
         for (var i = 0; i < this.capacity; i++)
         {
                 if (this.particles[i].get_life_left() <= 0 && spawns_left > 0)
                 {
                         var life = Utility.rand_range(this.life_min, this.life_max);
                         var x = cx - radius + Math.random() * (2 * radius);
                         var y = cy - radius + Math.random() * (2 * radius);
                         var scale_i = Utility.rand_range(this.initial_scale_min, this.initial_scale_max);
                         var alpha_i = Utility.rand_range(this.initial_alpha_min, this.initial_alpha_max);
                         var scale_f = Utility.rand_range(this.final_scale_min, this.final_scale_max);
                         var alpha_f = Utility.rand_range(this.final_alpha_min, this.final_alpha_max);
                         var angle = Utility.rand_range(this.angle_min, this.angle_max);
                         var speed = Utility.rand_range(this.speed_min, this.speed_max);
                         this.particles[i].spawn(life, x, y, scale_i, scale_f, alpha_i, alpha_f, angle, speed, this.sprite.get_random_index());
                         --spawns_left;
                         if (this.fuel > 0)
                         {
                                --this.fuel;
                         }
                 }
                 if (this.particles[i].get_life_left() > 0)
                 {
                         tex_coords = this.sprite.get_tile_coordinate(this.particles[i].get_tile_index());
                         var pos, offset, scale;
                         this.particles[i].advance(dt);
                         pos = this.particles[i].get_position();
                         scale = this.particles[i].get_scale();
                         offset = i * 20;
                         for (var j = 0; j < 4; j++)
                         {
                                 this.vertex_data[offset + (j * 5)] = pos.get(0) + (0.5 * scale * vertex_coefs[j * 2]);
                                 this.vertex_data[offset + (j * 5) + 1] = pos.get(1) + (0.5 * scale * vertex_coefs[j * 2 + 1]);
                                 this.vertex_data[offset + (j * 5) + 2] = tex_coords[j * 2];
                                 this.vertex_data[offset + (j * 5) + 3] = tex_coords[j * 2 + 1];
                                 this.vertex_data[offset + (j * 5) + 4] = this.particles[i].get_alpha();
                         }
                         for (var j = 0; j < 6; j++)
                         {
                                 this.index_data.push((i * 4) + indices[j]);
                         }
                 }
         }
 };

 Emitter.load = function(data)
 {
        var new_emitter = new Emitter(data.capacity);

        new_emitter.fuel = data.fuel;
        new_emitter.frequency = data.frequency;
        new_emitter.density = data.density;
        new_emitter.life_min = data.life_min;  
        new_emitter.life_max = data.life_max;
        new_emitter.speed_min = data.speed_min;
        new_emitter.speed_max = data.speed_max;
        new_emitter.angle_min = data.angle_min;
        new_emitter.angle_max = data.angle_max;
        new_emitter.initial_scale_min = data.initial_scale_min;
        new_emitter.initial_scale_max = data.initial_scale_max;
        new_emitter.final_scale_min = data.final_scale_min;
        new_emitter.final_scale_max = data.final_scale_max;
        new_emitter.initial_alpha_min = data.initial_alpha_min;  
        new_emitter.initial_alpha_max = data.initial_alpha_max;  
        new_emitter.final_alpha_min = data.final_alpha_min;   
        new_emitter.final_alpha_max = data.final_alpha_max;  
        new_emitter.spawn_area = new Circle(data.spawn_area.x, data.spawn_area.y, data.spawn_area.radius);
        new_emitter.sprite = new Sprite(data.sprite.width, data.sprite.height, data.sprite.image);
        for (var i = 0; i < data.sprite.tiles.length; i++)
        {
                new_emitter.sprite.add_tile(data.sprite.tiles[i].x,
                                            data.sprite.tiles[i].y,
                                            data.sprite.tiles[i].width,
                                            data.sprite.tiles[i].height);
        }
        return new_emitter;
 };

 Emitter.prototype.start = function(duration)
 {
        if (!duration) 
        {
                this.fuel = -1;
        }
        else 
        {
                this.fuel = Math.floor(duration/this.frequency) * this.density;
        }
 }

 Emitter.prototype.stop = function()
 {
        this.fuel = 0;
 }

 Emitter.prototype.translate = function(x, y) 
 {
         this.spawn_area.translate(x, y);
 };

 Emitter.prototype.scale = function(sx, sy) 
 {
         this.spawn_area.scale(sx, sy)
 };

 Emitter.prototype.rotate = function(angle)
 {
         this.spawn_area.rotate(angle);
 };

 Emitter.prototype.rotate_about = function(angle, x, y)
 {
         this.spawn_area.rotate_about(angle, x, y);
 };

 Emitter.prototype.get_vertex_data = function()
 {
         return this.vertex_data;
 };

 Emitter.prototype.get_index_data = function()
 {
         return this.index_data;
 };

 Emitter.prototype.get_fuel = function()
 {
         return this.fuel;        
 };

 Emitter.prototype.get_frequency = function()
 {
         return this.frequency;        
 };

 Emitter.prototype.get_density = function()
 {
         return this.density;        
 };

 Emitter.prototype.get_capacity = function()
 {
         return this.capacity;        
 };

 Emitter.prototype.get_life_min = function()
 {
         return this.life_min;        
 };

 Emitter.prototype.get_life_max = function()
 {
         return this.life_max;        
 };

 Emitter.prototype.get_speed_min = function()
 {
         return this.speed_min;        
 };

 Emitter.prototype.get_speed_max = function()
 {
         return this.speed_max;        
 };

 Emitter.prototype.get_angle_min = function()
 {
         return this.angle_min;        
 };

 Emitter.prototype.get_angle_max = function()
 {
         return this.angle_max;        
 };

 Emitter.prototype.get_initial_scale_min = function()
 {
         return this.initial_scale_min;        
 };

 Emitter.prototype.get_initial_scale_max = function()
 {
         return this.initial_scale_max;        
 };

 Emitter.prototype.get_final_scale_min = function()
 {
         return this.final_scale_min;        
 };

 Emitter.prototype.get_final_scale_max = function()
 {
         return this.final_scale_max;        
 };

 Emitter.prototype.get_initial_alpha_min = function()
 {
         return this.initial_alpha_min;        
 };

 Emitter.prototype.get_initial_alpha_max = function()
 {
         return this.initial_alpha_max;        
 };

 Emitter.prototype.get_final_alpha_min = function()
 {
         return this.final_alpha_min;        
 };

 Emitter.prototype.get_final_alpha_max = function()
 {
         return this.final_alpha_max;        
 };

 Emitter.prototype.get_spawn_area = function()
 {
         var c = this.spawn_area.get_centre();
         return new Circle(c.get(0), c.get(1), this.spawn_area.get_radius());
 };

 Emitter.prototype.get_sprite = function()
 {
         return this.sprite;
 };

 Emitter.prototype.set_spawn_area = function(x, y, radius)
 {
         this.spawn_area.set(x, y, radius);
 };

 Emitter.prototype.set_fuel = function(val)
 {
         this.fuel = val;
 };

 Emitter.prototype.set_frequency = function(val)
 {
         this.frequency = val;
 };

 Emitter.prototype.set_density = function(val)
 {
         this.density = val;
 };

 Emitter.prototype.set_life_min = function(val)
 {
         this.life_min = val;
 };

 Emitter.prototype.set_life_max = function(val)
 {
         this.life_max = val;
 };

 Emitter.prototype.set_speed_min = function(val)
 {
         this.speed_min = val;
 };

 Emitter.prototype.set_speed_max = function(val)
 {
         this.speed_max = val;
 };

 Emitter.prototype.set_angle_min = function(val)
 {
         this.angle_min = val;
 };

 Emitter.prototype.set_angle_max = function(val)
 {
         this.angle_max = val;
 };

 Emitter.prototype.set_initial_scale_min = function(val)
 {
         this.initial_scale_min = val;
 };

 Emitter.prototype.set_initial_scale_max = function(val)
 {
         this.initial_scale_max = val;
 };

 Emitter.prototype.set_final_scale_min = function(val)
 {
         this.final_scale_min = val;
 };

 Emitter.prototype.set_final_scale_max = function(val)
 {
         this.final_scale_max = val;
 };

 Emitter.prototype.set_initial_alpha_min = function(val)
 {
         this.initial_alpha_min = val;
 };

 Emitter.prototype.set_initial_alpha_max = function(val)
 {
         this.initial_alpha_max = val;
 };

 Emitter.prototype.set_final_alpha_min = function(val)
 {
         this.final_alpha_min = val;
 };

 Emitter.prototype.set_final_alpha_max = function(val)
 {
         this.final_alpha_max = val;
 };

 Emitter.prototype.set_sprite = function(sprite)
 {
         this.sprite = sprite;
 };