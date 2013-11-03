/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        sprite tile
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Tile(x, y, width, height)
{
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
};

Tile.prototype.get_position = function()
{
        return new Vector2(this.position.get(0), this.position.get(1));
};

Tile.prototype.get_width = function()
{
        return this.width;
};

Tile.prototype.get_height = function()
{
        return this.height;
};

Tile.prototype.set_position = function(ax, ay)
{
        this.position.set_values(ax, ay);
};

Tile.prototype.set_dimensions = function(width, height)
{
        this.width = width;
        this.height = height;
};