/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        4d vector class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Vector4.prototype = new Vector(4);
Vector4.prototype.constructor = Vector4;
function Vector4(x, y, z, w)
{
        Vector.call(this, 4);
        this.elements[0] = x;
        this.elements[1] = y;
        this.elements[2] = z;
        this.elements[3] = w;
};

Vector4.prototype.set_values = function(x, y, z, w)
{
        this.elements[0] = x;
        this.elements[1] = y;  
        this.elements[2] = z;
        this.elements[3] = w;
};