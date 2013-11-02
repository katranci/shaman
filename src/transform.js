/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2d transformation
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Transform()
{
        this.translation = new Vector3(0.0, 0.0, 0.0);
        this.scale = new Vector3(1.0, 1.0, 1.0);
        this.rotation = 0.0;
        this.alpha = 1.0;
        this.pivot = new Vector3(0.0, 0.0, 0.0);
};

Transform.prototype.get_translation = function()
{   
        return new Vector3(this.translation.get(0), this.translation.get(1), 0.0);
};

Transform.prototype.get_scale = function()
{
        return new Vector3(this.scale.get(0), this.scale.get(1), 0.0);
};

Transform.prototype.get_rotation = function()
{
        return this.rotation;
};

Transform.prototype.get_alpha = function()
{
        return this.alpha;
};

Transform.prototype.get_pivot = function()
{
        return new Vector3(-pivot.get(0), -pivot.get(1), 0.0);
};

Transform.prototype.translate = function(x, y)
{
        this.translation.set_values(x + this.translation.get(0), y + this.translation.get(1), 0.0);
};

Transform.prototype.scale = function(x, y)
{
        this.scale.set_values(x * this.scale.get(0), y * this.scale.get(1), 1.0);
};

Transform.prototype.rotate = function(angle)
{
        this.rotation += angle;
};

Transform.prototype.set_translation = function(x, y)
{
        this.translation.set_values(x, y, 0.0);
};

Transform.prototype.set_scale = function(x, y)
{
        this.scale.set_values(x, y, 1.0);
};

Transform.prototype.set_rotation = function(angle)
{
        this.rotation = angle;
};

Transform.prototype.set_alpha = function(a)
{
        this.alpha = a;
};

Transform.prototype.set_pivot = function(x, y)
{
        this.pivot.set_values(-x, -y, 0.0);
};

Transform.prototype.calculate_matrix = function(matrix)
{
        var cos_r = Math.cos(MathLib.degree_to_radian(this.rotation))
        var sin_r = Math.sin(MathLib.degree_to_radian(this.rotation))
        var px = this.pivot.get(0);
        var py = this.pivot.get(1);
        var sx = this.scale.get(0);
        var sy = this.scale.get(1);
        
        matrix.copy_array(
                [cos_r * sx, -sin_r * sy, 0, cos_r * px - sin_r * py - px + this.translation.get(0),
                 sin_r * sx, cos_r * sy,  0, sin_r * px + cos_r * py - py + this.translation.get(1),
                 0,          0,           1, 0, 
                 0,          0,           0, 1]);
        matrix.transpose();
};

Transform.prototype.lerp = function(target, time)
{
        var temp = new Vector3();
        var result = new Transform();

        /*  TODO: optimize by checking special time values such as
                  0, 1 and compare components of target and this */

        temp.lerp(this.translation, target.get_translation(), time);
        result.set_translation(temp.get(0), temp.get(1));
        temp.lerp(this.scale, target.get_scale(), time);
        result.set_scale(temp.get(0), temp.get(1));
        temp.lerp(this.pivot, target.get_pivot(), time);
        result.set_pivot(temp.get(0), temp.get(1));
        result.set_rotation(MathLib.lerp(this.rotation, target.get_rotation(), time));
        result.set_alpha(MathLib.lerp(this.alpha, target.get_alpha(), time));

        return result;
};