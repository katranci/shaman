/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        vector base class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Vector.prototype = new Tuple();
Vector.prototype.constructor = Vector;
function Vector(n)
{
        Tuple.call(this, n);
};

/* scale vector1 by vector2 */
Vector.prototype.scale = function(v1, v2)
{
        for (var i = 0; i < this.size; i++) 
        {
                this.elements[i] = v1.get(i) * v2.get(i);
        }
};

/* vector-matrix multiplication */
Vector.prototype.mul = function(v, m)
{
        var temp = new Vector(this.size);

        for (var i = 0; i < this.size; i++)
        {
                for (var j = 0; j < this.size; j++)
                {
                        temp.set(i, temp.get(i) + m.get_ij(i, j) * v.get(j));
                }
        }
        this.copy(temp);
};

/* length of vector */
Vector.prototype.len = function()
{
        return MathLib.fsqrt(this.len2());
};


/* square length of vector */
Vector.prototype.len2 = function()
{
        var l = 0.0;

        for (var i = 0; i < this.size; i++) 
        {
                l += this.elements[i] * this.elements[i];
        }
        return l;
};

/* dot product */
Vector.prototype.dot = function(v)
{
        var d = 0.0;

        for (var i = 0; i < this.size; i++)
        {
                d += this.elements[i] * v.get(i);
        }
        return d;
};

/* normalizes the vector */
Vector.prototype.normalize = function()
{
        var inv_length = 1.0 / this.len();

        for (var i = 0; i < this.size; i++) 
        {
                this.elements[i] = this.elements[i] * inv_length;
        }
};

/* linearly interpolates between two vectors */
Vector.prototype.lerp = function(from, to, time)
{
        var temp = new Vector(this.size);   

        temp.sub(to, from);
        temp.mul_s(temp, time);
        this.add(from, temp);
};

/* returns the mid point of two vectors */
Vector.prototype.centre = function(v1, v2)
{
        this.add(v1, v2);
        this.div_s(this, 2.0);
};

/* reflects vector1 about vector1 and normal */
Vector.prototype.reflect = function(v1, v2, n)
{
        var dot2 = v1.dot(n) * 2.0;

        this.mul_s(normal, dot2);
        this.sub(v2, this);
};

/* distance between two vectors */
Vector.prototype.distance = function(v)
{
        var temp = new Vector(this.size);

        temp.sub(this, v);
        return temp.len();
};