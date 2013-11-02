/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2d circle
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Circle(x, y, radius)
{
        this.centre = new Vector2(x, y);
        this.radius = radius;
};

Circle.prototype.get_centre = function(i)
{
        return new Vector2(this.centre.get(0), this.centre.get(1));
};

Circle.prototype.get_radius = function(i)
{
        return this.radius;
};

Circle.prototype.set = function(x, y, radius)
{
        this.centre.set_values(x, y);
        this.radius = radius;
};

Circle.prototype.translate = function(x, y) 
{
        this.centre.add(this.centre, new Vector2(x, y));
};

Circle.prototype.scale = function(sx, sy) 
{
        var cx = this.centre.get(0);
        var cy = this.centre.get(1);
        var amount = new Vector2(sx, sy);

        this.translate(-cx, -cy);
        this.centre.scale(this.centre, amount);
        this.translate(cx, cy);
};

Circle.prototype.rotate = function(angle)
{
        this.centre.rotate(angle);
};

Circle.prototype.rotate_about = function(angle, x, y)
{
        this.centre.rotate_about(angle, new Vector2(x, y));
};

Circle.prototype.area = function()
{
        return Math.PI * this.radius * this.radius;
};

Circle.prototype.is_point_inside = function(point)
{
        var distance = new Vector2();

        distance.sub(this.centre, point);
        return (distance.len() <= this.radius);
};

Circle.prototype.is_line_inside = function(line) 
{
        var ac = new Vector2();
        var bc = new Vector2();

        ac.sub(this.centre, line.get_point(0));
        bc.sub(this.centre, line.get_point(1));
        return (ac.len() <= this.radius && bc.len() <= this.radius);
};

Circle.prototype.is_line_colliding = function(line) 
{
        var ab = new Vector2();
        var ac = new Vector2();
        var h = new Vector2();

        ab.sub(line.get_point(1), line.get_point(0));
        ac.sub(this.centre, line.get_point(0));
        h.mul_s(ab, MathLib.saturate(ac.dot(ab) / ab.dot(ab)));
        h.add(h, line.get_point(0));
        h.add(h, this.centre);
        return (h.dot(h) <= (this.radius * this.radius));
};

Circle.prototype.insert_point = function(point)
{
        var distance = new Vector2();
        var len;

        distance.sub(this.centre, point);
        len = distance.len();
        this.radius = (len > this.radius)?(len):(this.radius);
};

Circle.prototype.unit = function()
{
        this.centre.zero();
        this.radius = 0.5;
};