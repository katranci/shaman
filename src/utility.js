/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *      utility.js  
 *          
 *      Utility library 
 *         
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Utility() 
{

};

/*  A 32-bit buffer and 2 different (float and int) representations. 
    Used for bitwise hacks on floats. */
Utility.buffer32 = new ArrayBuffer(4);
Utility.ui32reg = new Uint32Array(Utility.buffer32);
Utility.f32reg = new Float32Array(Utility.buffer32);

/*  generates a random floating number within [min, max] */
Utility.rand_range = function(min, max)
{
        return (Math.fequals(min, max, MathLib.epsilon))?(min):((Math.random() * (max - min)) + min);
};

/*  creates an extensible object from another object */
Utility.extend = function (object) 
{
        var base_object = function() {};
        var new_object;
        
        base_object.prototype = object;
        new_object = new base_object();
        new_object.base = base_object.prototype;

        return new_object;
};

Utility.get_shader_source = function(id)
{
        var source = document.getElementById(id);
        var string = "";
        var node = source.firstChild;
        while (node) 
        {
                if (node.nodeType == 3) 
                {
                        string += node.textContent;
                }
                node = node.nextSibling;
        }
        return string;
};

Utility.rand_range = function(min, max) 
{
        return Math.random() * (max - min) + min;
};

Utility.rand_int_range = function(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Utility.get_time = (function() {
    var p = window.performance || {};
    var n = p.now || p.mozNow || p.webkitNow || p.msNow || p.oNow;
    return (n) ? (n.bind(p)) : (function() {return Date.now();});
})();
