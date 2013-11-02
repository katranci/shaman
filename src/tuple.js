/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        tuple  class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Tuple(n)
{
        this.elements = new Array(n);
        this.size = n;
};

/*  returns float array of tuples */
Tuple.prototype.get_array = function()
{
        return this.elements;
};

/* returns i-th element of tuple */
Tuple.prototype.get = function(i)
{
        return this.elements[i];
};

/* returns the size of tuple */
Tuple.prototype.get_size = function()
{
        return size;
};

/* sets i-th element of tuple */
Tuple.prototype.set = function(i, val)
{
        this.elements[i] = val;
};

/* copies another tuple into this one */
Tuple.prototype.copy = function(t)
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = t.get(i);
        }
};

/* copies an array's elements into tuple */
Tuple.prototype.copy_array = function(array)
{
        for (var i = 0; i < this.elements.length; i++) 
        { 
                this.elements[i] = array[i];
        }
};

/* resets tuple this.elements */
Tuple.prototype.zero = function()
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = 0;
        }
};

/* negates tuple this.elements */
Tuple.prototype.negate = function()
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = -this.elements[i];
        }
};

/* tuple-tuple addition */
Tuple.prototype.add = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t1.get(i) + t2.get(i);
        }
};

/* tuple-scalar addition */
Tuple.prototype.add_s = function(t, s)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i) + s;
        }
};

/* tuple-tuple subtraction */
Tuple.prototype.sub = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t1.get(i) - t2.get(i);
        }
};

/* tuple-scalar subtraction */
Tuple.prototype.sub_s = function(t, s)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i) - s;
        }
};

/* tuple-scalar multiplication */
Tuple.prototype.mul_s = function(t, s)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i) * s;
        }
};

/* equality comparison */
Tuple.prototype.equals = function(t)
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                if (!MathLib.fequals(this.elements[i], t.get(i), MathLib.epsilon))
                {
                        return false;
                }
        }
        return true;
};

/* returns a tuple with greater this.elements of two tuples */
Tuple.prototype.ceil = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = Math.max(t1.get(i), t2.get(i));
        }
};

/* returns a tuple with lesser elements of two tuples */
Tuple.prototype.floor = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = Math.min(t1.get(i), t2.get(i));
        }
};

/* clamps tuple's elements between [min, max] */
Tuple.prototype.clamp = function(min, max)
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = MathLib.clamp(this.elements[i], min, max);
        }
};

/* clamps tuple's elements between [0, 1] */
Tuple.prototype.saturate = function()
{
        for (var i = 0; i < this.elements.length; i++) 
        {
                this.elements[i] = MathLib.saturate(this.elements[i]);
        }
};
