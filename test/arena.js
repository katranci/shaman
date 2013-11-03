function Arena()
{
        this.bounds;
        this.sprite;
        this.frame;
}

Arena.load = function(data)
{
        var new_arena = new Arena();

        new_arena.bounds = new Polygon();
        new_arena.bounds.insert_array(data.bounds);
        new_arena.sprite = new Sprite(data.sprite.width, data.sprite.height, data.sprite.image);
        new_arena.sprite.generate_tiles(1, 1, 1);
        new_arena.frame = new Quad(0.0,               0.0, 
                                   data.sprite.width, 0.0, 
                                   data.sprite.width, data.sprite.height, 
                                   0.0,               data.sprite.height);
        new_arena.frame.rotate(data.frame.rotation);
        new_arena.bounds.rotate(data.frame.rotation);
        new_arena.frame.translate(data.frame.x, data.frame.y);
        new_arena.bounds.translate(data.frame.x, data.frame.y);
        return new_arena;
}

Arena.prototype.get_sprite = function()
{
        return this.sprite;
};

Arena.prototype.get_frame = function()
{
        return this.frame;
};

Arena.prototype.get_bounds = function()
{
        return this.bounds;
};