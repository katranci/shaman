/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2d vector class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Vector2.prototype = new Vector(2);
Vector2.prototype.constructor = Vector2;
function Vector2(x, y)
{
        Vector.call(this, 2);
        this.elements[0] = x;
        this.elements[1] = y;
};

Vector2.prototype.set_values = function(x, y)
{
        this.elements[0] = x;
        this.elements[1] = y;  
};

/* perpendicular dot product */
Vector2.prototype.perp_dot = function(v)
{
        return this.elements[0] * v.get(1) - this.elements[1] * v.get(0);
};

/* angle between two vectors */
Vector2.prototype.angle = function(v)
{
        return MathLib.radian_to_degree(-Math.atan2(this.perp_dot(v), this.dot(v)));
};

/* rotates the vector about origin */
Vector2.prototype.rotate = function(d)
{
        var radian = MathLib.degree_to_radian(d),
                t0 = this.elements[0],
                c = Math.cos(radian),
                s = Math.sin(radian);

        this.elements[0] = t0 * c + this.elements[1] * -s;
        this.elements[1] = t0 * s + this.elements[1] * c;
};

/* rotates the vector about a custom pivot */
Vector2.prototype.rotate_about = function(d, p)
{ 
        this.elements[0] = this.elements[0] - p.get(0);
        this.elements[1] = this.elements[1] - p.get(1);
        this.rotate(d);
        this.elements[0] = this.elements[0] + p.get(0);
        this.elements[1] = this.elements[1] + p.get(1);
};