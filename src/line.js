/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2d line
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Line(ax, ay, bx, by)
{
        this.points = [new Vector2(ax, ay), new Vector2(bx, by)];
};

Line.prototype.get_point = function(i)
{
        return new Vector2(this.points[i].get(0), this.points[i].get(1));
};

Line.prototype.set = function(ax, ay, bx, by)
{
        this.points[0].set_values(ax, ay);
        this.points[1].set_values(bx, by);
};

Line.prototype.translate = function(x, y) 
{
        var amount = new Vector2(x, y);
        this.points[0].add(this.points[0], amount);
        this.points[1].add(this.points[1], amount);
};

Line.prototype.centre = function()
{
        return new Vector2((this.points[0].get(0) + this.points[1].get(0)) / 2.0,
                           (this.points[0].get(1) + this.points[1].get(1)) / 2.0);
};

Line.prototype.scale = function(sx, sy) 
{
        var c = this.centre();
        var cx = c.get(0);
        var cy = c.get(1);
        var amount = new Vector2(sx, sy);

        this.translate(-cx, -cy);
        this.points[0].scale(this.points[0], amount);
        this.points[1].scale(this.points[1], amount);
        this.translate(cx, cy);
};

Line.prototype.rotate = function(angle)
{
        this.points[0].rotate(angle);
        this.points[1].rotate(angle);
};

Line.prototype.rotate_about = function(angle, x, y)
{
        var pivot = new Vector2(x, y);
        
        this.points[0].rotate_about(angle, pivot);
        this.points[1].rotate_about(angle, pivot);
};

Line.prototype.len = function()
{
        var dist = new Vector2();

        dist.sub(this.points[1], this.points[0]);
        return dist.len();
};

Line.prototype.is_line_colliding = function(line)
{
        var l1 = line.get_point(0);
        var l2 = line.get_point(1);
        var d = (this.points[0].get(0) - this.points[1].get(0)) * (l1.get(1) - l2.get(1)) - (this.points[0].get(1) - this.points[1].get(1)) * (l1.get(0) - l2.get(0));
        var pre, post, x, y;

        if (MathLib.fequals(d, 0.0, MathLib.epsilon)) 
        {
                return false;
        }
        pre = this.points[0].get(0) * this.points[1].get(1) - this.points[0].get(1) * this.points[1].get(0);
        post = l1.get(0) * l2.get(1) - l1.get(1) * l2.get(0);
        x = (pre * (l1.get(0) - l2.get(0)) - (this.points[0].get(0) - this.points[1].get(0)) * post) / d;
        y = (pre * (l1.get(1) - l2.get(1)) - (this.points[0].get(1) - this.points[1].get(1)) * post) / d;
        if (x < Math.min(this.points[0].get(0), this.points[1].get(0)) || 
            x > Math.max(this.points[0].get(0), this.points[1].get(0)) || 
            x < Math.min(l1.get(0), l2.get(0)) || 
            x > Math.max(l1.get(0), l2.get(0))) 
        {
                return false;
        }
        if (y < Math.min(this.points[0].get(1), this.points[1].get(1)) || 
            y > Math.max(this.points[0].get(1), this.points[1].get(1)) || 
            y < Math.min(l1.get(1), l2.get(1)) || 
            y > Math.max(l1.get(1), l2.get(1))) 
        {
                return false;
        }
        /*
                intersection.set(0, x);
                intersection.set(1, y);
        */
        return true;
};

Line.prototype.unit = function()
{
        this.points[0].set_values(0.0, 0.0);
        this.points[1].set_values(1.0, 1.0);
};