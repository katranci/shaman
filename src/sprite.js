/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        sprite tile
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Sprite(width, height, image_path)
{
        this.tiles = [];
        this.width = width;
        this.height = height;
        this.current_tile = 0;
        this.image_path = image_path;

        this.remaining = 0;
        this.framerate = 0;
        this.update_time = 0;
};

Sprite.prototype.add_tile = function(x, y, width, height)
{
        this.tiles.push(new Tile(x, y, width, height));
};

Sprite.prototype.get_tile_coordinate = function(i)
{
        if (!i)
        {
                i = this.current_tile;
        }

        var pos = this.tiles[i].get_position();
        var x = pos.get(0);
        var y = pos.get(1);
        var w = this.tiles[i].get_width();
        var h = this.tiles[i].get_height();
        var rx = (1.0 / this.width);
        var ry = (1.0 / this.height);

        x = x * rx;
        y = y * ry;
        w = w * rx;
        h = h * ry;

        return [x, y, x + w, y, x + w, y + h, x, y +h];
};

Sprite.prototype.get_random_index = function()
{
        return Utility.rand_int_range(0, this.tiles.length - 1);
};

Sprite.prototype.next_tile = function()
{
        this.current_tile = (this.current_tile + 1) % this.tiles.length;
};

Sprite.prototype.previous_tile = function()
{
        this.current_tile = ((this.current_tile - 1) + this.tiles.length) % this.tiles.length;
};

Sprite.prototype.get_image_path = function()
{
        return this.image_path;
};

Sprite.prototype.switch_tile = function(i)
{
        while (i < 0) 
        {
                i += this.tiles.length;
        }
        this.current_tile = i % this.tiles.length;
};

Sprite.prototype.generate_tiles = function(v, h, count)
{
        var current = 0;
        var width = this.width / h;
        var height = this.height / v;
        this.tiles.length = 0;
        for (var i = 0; i < h; i++)
        {
                for (var j = 0; j < v; j++)
                {
                        this.tiles.push(new Tile((width * i), (height * j), width, height));
                        current++;
                        if (current >= count)
                        {
                                return;
                        }
                }
        }
};

Sprite.prototype.start_animation = function(duration, count)
{
        if (this.tiles.length < 1)
        {
                return;
        }
        if (!count) 
        {
                this.remaining = -1;
        }
        else 
        {
                this.remaining = count * this.tiles.length;
        }
        this.framerate = duration / this.tiles.length;
        this.update_time = this.framerate;
};

Sprite.prototype.stop_animation = function()
{
        this.remaining = 0;
        this.current_tile = 0;
};

Sprite.prototype.advance = function(dt)
{
        if (this.remaining !== 0)
        {
                this.update_time -= dt;
                if (this.update_time <= 0)
                {
                        if (this.remaining > 0)
                        {
                                this.remaining--;
                        }
                        this.update_time = this.framerate;
                        this.next_tile();
                }
        }
}