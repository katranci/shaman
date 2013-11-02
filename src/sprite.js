/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        sprite tile
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Sprite(width, height)
{
        this.tiles = [];
        this.width = width;
        this.height = height;
};

Sprite.prototype.add_tile = function(x, y, width, height)
{
        this.tiles.push(new Tile(x, y, width, height));
};

Sprite.prototype.calculate_tile_coordinate = function(i)
{
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