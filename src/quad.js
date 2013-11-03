/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2d quadrilateral
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Quad(ax, ay, bx, by, cx, cy, dx, dy)
{
        this.corners = [new Vector2(ax, ay), new Vector2(bx, by), new Vector2(cx, cy), new Vector2(dx, dy)];
};

Quad.prototype.get_copy = function()
{
        return new Quad(this.corners[0].get(0), this.corners[0].get(1),
                        this.corners[1].get(0), this.corners[1].get(1),
                        this.corners[2].get(0), this.corners[2].get(1),
                        this.corners[3].get(0), this.corners[3].get(1));
}

Quad.prototype.get_corner = function(i)
{
        return new Vector2(this.corners[i].get(0), this.corners[i].get(1));
};

Quad.prototype.set = function(ax, ay, bx, by, cx, cy, dx, dy)
{
        this.corners[0].set_values(ax, ay);
        this.corners[1].set_values(bx, by);
        this.corners[2].set_values(cx, cy); 
        this.corners[3].set_values(dx, dy); 
};

Quad.prototype.translate = function(x, y) 
{
        var amount = new Vector2(x, y);
        this.corners[0].add(this.corners[0], amount);
        this.corners[1].add(this.corners[1], amount);
        this.corners[2].add(this.corners[2], amount);
        this.corners[3].add(this.corners[3], amount);
};

Quad.prototype.centre = function()
{
        return new Vector2((this.corners[0].get(0) + this.corners[1].get(0) + this.corners[2].get(0) + this.corners[3].get(0)) / 4.0,
                           (this.corners[0].get(1) + this.corners[1].get(1) + this.corners[2].get(1) + this.corners[3].get(1)) / 4.0);
};

Quad.prototype.scale = function(sx, sy) 
{
        var c = this.centre();
        var cx = c.get(0);
        var cy = c.get(1);
        var amount = new Vector2(sx, sy);

        this.translate(-cx, -cy);
        this.corners[0].scale(this.corners[0], amount);
        this.corners[1].scale(this.corners[1], amount);
        this.corners[2].scale(this.corners[2], amount);
        this.corners[3].scale(this.corners[3], amount);
        this.translate(cx, cy);
};

Quad.prototype.rotate = function(angle)
{
        this.corners[0].rotate(angle);
        this.corners[1].rotate(angle);
        this.corners[2].rotate(angle);
        this.corners[3].rotate(angle);
};

Quad.prototype.rotate_about = function(angle, x, y)
{
        var pivot = new Vector2(x, y);
        this.corners[0].rotate_about(angle, pivot);
        this.corners[1].rotate_about(angle, pivot);
        this.corners[2].rotate_about(angle, pivot);
        this.corners[3].rotate_about(angle, pivot);
};

Quad.prototype.area = function()
{
        var edge1 = new Vector2();
        var edge2 = new Vector2();

        edge1.sub(this.corners[1], this.corners[0]);
        edge2.sub(this.corners[3], this.corners[0]);
        return edge1.len() * edge2.len();
};

Quad.prototype.is_point_inside = function(point)
{
        var edge1 = new Vector2();
        var edge2 = new Vector2();
        var point_to_corner = new Vector2();
        var edge1_dot, edge2_dot;
        var distance_dot_edge1, distance_dot_edge2;

        edge1.sub(this.corners[1], this.corners[0]);
        edge2.sub(this.corners[3], this.corners[0]);
        point_to_corner.sub(point, this.corners[0]);

        edge1_dot = edge1.dot(edge1);
        edge2_dot = edge2.dot(edge2);
        distance_dot_edge1 = point_to_corner.dot(edge1);
        distance_dot_edge2 = point_to_corner.dot(edge2);

        return (0.0 <= distance_dot_edge1 && distance_dot_edge1 <= edge1_dot && 
                0.0 <= distance_dot_edge2 && distance_dot_edge2 <= edge2_dot);
};

Quad.prototype.is_line_inside = function(line) 
{
        return (this.is_point_inside(line.get_point(0)) &&
                this.is_point_inside(line.get_point(1)));
};

Quad.prototype.is_quad_inside = function(quad) 
{
        return (this.is_point_inside(quad.get_corner(0)) &&
                this.is_point_inside(quad.get_corner(1)) &&
                this.is_point_inside(quad.get_corner(2)) &&
                this.is_point_inside(quad.get_corner(3)));
};

Quad.prototype.is_line_colliding = function(line) 
{
        var l = new Line();
        var collision;

        l.set(this.corners[0].get(0), this.corners[0].get(1), this.corners[1].get(0), this.corners[1].get(1));
        collision = l.is_line_colliding(line);
        if (collision)
        {
                return true;
        }
        l.set(this.corners[1].get(0), this.corners[1].get(1), this.corners[2].get(0), this.corners[2].get(1));
        collision = collision || l.is_line_colliding(line);
        if (collision)
        {
                return true;
        }
        l.set(this.corners[2].get(0), this.corners[2].get(1), this.corners[3].get(0), this.corners[3].get(1));
        collision = collision || l.is_line_colliding(line);
        if (collision)
        {
                return true;
        }
        l.set(this.corners[3].get(0), this.corners[3].get(1), this.corners[0].get(0), this.corners[0].get(1));
        return (collision || l.is_line_colliding(line));
};

Quad.prototype.is_quad_colliding = function(quad) 
{
        return (this.is_point_inside(quad.get_corner(0)) ||
                this.is_point_inside(quad.get_corner(1)) ||
                this.is_point_inside(quad.get_corner(2)) ||
                this.is_point_inside(quad.get_corner(3)) ||
                quad.is_point_inside(this.corners[0]) ||
                quad.is_point_inside(this.corners[1]) ||
                quad.is_point_inside(this.corners[2]) ||
                quad.is_point_inside(this.corners[3]));
};

Quad.prototype.unit = function()
{
        this.corners[0].set_values(-0.5, -0.5);
        this.corners[1].set_values(0.5, -0.5);
        this.corners[2].set_values(0.5, 0.5); 
        this.corners[3].set_values(-0.5, 0.5);
};

Quad.prototype.direction = function()
{
        var front = new Vector2((this.corners[0].get(0) + this.corners[1].get(0)) / 2.0, (this.corners[0].get(1) + this.corners[1].get(1)) / 2.0);
        front.sub(front, this.centre());
        front.normalize();
        return front;
};

Quad.prototype.angle = function()
{
        return this.direction().angle(new Vector2(0.0, -1.0));
};