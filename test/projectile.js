function Projectile()
{
        this.sprite;
        this.frame;
        this.speed;
}

Projectile.load = function(data)
{
        var new_projectile = new Projectile();

        new_projectile.bounds = new Polygon();
        new_projectile.sprite = new Sprite(data.sprite.width, data.sprite.height, data.sprite.image);
        new_projectile.sprite.generate_tiles(data.sprite.tiles.vertical, data.sprite.tiles.horizontal, data.sprite.tiles.count);
        new_projectile.frame = new Quad(data.frame.x,                    data.frame.y,
                                        data.frame.x + data.frame.width, data.frame.y,
                                        data.frame.x + data.frame.width, data.frame.y + data.frame.height,
                                        data.frame.x,                    data.frame.y + data.frame.height);      
        new_projectile.speed = data.speed;
        new_projectile.sprite.start_animation(200);
        return new_projectile;
}

Projectile.prototype.move = function(x, y)
{
        this.frame.translate(x, y);
};

Projectile.prototype.rotate = function(angle)
{
        var pivot = this.frame.centre();
        this.frame.rotate_about(angle, pivot.get(0), pivot.get(1));
};

Projectile.prototype.get_sprite = function()
{
        return this.sprite;
};

Projectile.prototype.get_frame = function()
{
        return this.frame;
};

Projectile.prototype.get_position = function()
{
        return new Vector2(this.position.get(0), this.position.get(1));
};

Projectile.prototype.advance = function(dt)
{
        var ax = this.frame.centre().get(0);
        var ay = this.frame.centre().get(1);
        this.sprite.advance(dt);
        var dir = this.frame.direction();
        dir.mul_s(dir, this.speed * (dt/1000));
        this.move(dir.get(0), dir.get(1));
        return new Line(ax, ay, this.frame.centre().get(0), this.frame.centre().get(1));
};
