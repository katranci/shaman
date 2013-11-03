/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        3d vector class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Vector3.prototype = new Vector(3);
Vector3.prototype.constructor = Vector3;
function Vector3(x, y, z)
{
        Vector.call(this, 3);
        this.elements[0] = x;
        this.elements[1] = y;
        this.elements[2] = z;
};

Vector3.prototype.set_values = function(x, y, z)
{
        this.elements[0] = x;
        this.elements[1] = y;  
        this.elements[2] = z;
};

/* cross product */
Vector3.prototype.cross = function(v1, v2)
{
        var temp = new Vector3(v1.get(1) * v2.get(2) - v1.get(2) * v2.get(1),
                               v1.get(2) * v2.get(0) - v1.get(0) * v2.get(2),
                               v1.get(0) * v2.get(1) - v1.get(1) * v2.get(0));

        this.copy(temp);
};
