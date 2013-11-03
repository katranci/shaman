/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2d polygon
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Polygon()
{
        this.points = [];
        this.lines = [];
};

Polygon.prototype.get_copy = function()
{
        var polygon = new Polygon();
        for (var i = 0; i < this.points.length; i++)
        {
                polygon.insert_point(this.points[i].get(0), this.points[i].get(1));
        }
        return polygon;
};

Polygon.prototype.rebuild = function()
{
        var last = this.points.length - 1;
        this.lines.length = 0;
        for (var i = 0; i < last; i++)
        {
                this.lines.push(new Line(this.points[i].get(0), 
                                         this.points[i].get(1), 
                                         this.points[i+1].get(0), 
                                         this.points[i+1].get(1)));
        }
        this.lines.push(new Line(this.points[last].get(0), 
                                 this.points[last].get(1), 
                                 this.points[0].get(0), 
                                 this.points[0].get(1)));
};

Polygon.prototype.get_point = function(i)
{
        return new Vector2(this.points[i].get(0), this.points[i].get(1));
};

Polygon.prototype.get_point_count = function()
{
        return this.points.length;
};

Polygon.prototype.insert_point = function(x, y)
{
        this.points.push(new Vector2(x, y));
        this.rebuild();
};

Polygon.prototype.insert_array = function(arr)
{
        var len = arr.length / 2.0;
        for (var i = 0; i < len; i++)
        {
                this.points.push(new Vector2(arr[i*2], arr[i*2+1]));
        }
        this.rebuild();
};

Polygon.prototype.translate = function(x, y) 
{
        var amount = new Vector2(x, y);
        for (var i = 0; i < this.points.length; i++)
        {
                this.points[i].add(this.points[i], amount);
        }
        this.rebuild();
};

Polygon.prototype.centre = function()
{
        return this.get_aabb().centre();
};

Polygon.prototype.scale = function(sx, sy) 
{
        var c = this.centre();
        var cx = c.get(0);
        var cy = c.get(1);
        var amount = new Vector2(sx, sy);

        this.translate(-cx, -cy);
        for (var i = 0; i < this.points.length; i++)
        {
                this.points[i].scale(this.points[i], amount);
        }
        this.translate(cx, cy);
        this.rebuild();
};

Polygon.prototype.rotate = function(angle)
{
        for (var i = 0; i < this.points.length; i++)
        {
                this.points[i].rotate(angle);
        }
        this.rebuild();
};

Polygon.prototype.rotate_about = function(angle, x, y)
{
        var pivot = new Vector2(x, y);
        for (var i = 0; i < this.points.length; i++)
        {
                this.points[i].rotate_about(angle, pivot);
        }
        this.rebuild();
};

Polygon.prototype.is_line_colliding = function(line) 
{
        for (var i = 0; i < this.lines.length; i++)
        {
                if (line.is_line_colliding(this.lines[i]))
                {
                        return true;
                }
        }
        return false;
};

Polygon.prototype.is_circle_colliding = function(circle) 
{
        for (var i = 0; i < this.lines.length; i++)
        {
                if (circle.is_line_colliding(this.lines[i]))
                {
                        return true;
                }
        }
        return false;
};

Polygon.prototype.is_quad_colliding = function(quad) 
{
        for (var i = 0; i < this.lines.length; i++)
        {
                if (quad.is_line_colliding(this.lines[i]))
                {
                        return true;
                }
        }
        return false;
};

Polygon.prototype.is_polygon_colliding = function(polygon) 
{
        for (var i = 0; i < this.lines.length; i++)
        {
                if (polygon.is_line_colliding(this.lines[i]))
                {
                        return true;
                }
        }
        return false;
};

Polygon.prototype.get_aabb = function() 
{
        var ax = Number.MAX_VALUE;
        var ay = Number.MAX_VALUE;
        var bx = Number.MIN_VALUE;
        var by = Number.MAX_VALUE;
        var cx = Number.MIN_VALUE;
        var cy = Number.MIN_VALUE;
        var dx = Number.MAX_VALUE;
        var dy = Number.MIN_VALUE;

        for (var i = 0; i < this.points.length; i++)
        {
                var x = this.points[i].get(0);
                var y = this.points[i].get(1);
                if (x < ax) ax = x;
                if (y < ay) ay = y;
                if (x > bx) bx = x;
                if (y < by) by = y;
                if (x > cx) cx = x;
                if (y > cy) cy = y;
                if (x < dx) dx = x;
                if (y > dy) dy = y;
        }
        return new Quad(ax, ay, bx, by, cx, cy, dx, dy);
};

Polygon.prototype.get_array = function()
{
        var points = [];
        for (var i = 0; i < this.points.length; i++)
        {
            points.push(this.points[i].get(0));
            points.push(this.points[i].get(1));
        }
        return points;
}

Polygon.prototype.reset = function()
{
        this.points.length = 0;
        this.lines.length = 0;
};