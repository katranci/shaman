/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        additional mathematical functions
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function MathLib() 
{
    
};

MathLib.epsilon = 0.000001;

/*  fast float absolute value. basically removes sign bit of 32-bit float 
    (IEEE 754) */
MathLib.fabs = function(val)
{
        Utility.f32reg[0] = val;
        Utility.ui32reg[0] &= 0x7FFFFFFF;
        return Utility.f32reg[0];
};

/*  fast square root estimation based on newton-raphson method 
    (with chris lomont's optimization) */
MathLib.fsqrt = function(val)
{
        var half = val * 0.5;

        Utility.f32reg[0] = val;
        /*  first estimation */
        Utility.ui32reg[0] = 0x5F375A86 - (Utility.ui32reg[0] >> 1);
        /*  first iteration  */
        Utility.f32reg[0] *= (1.5 - half * Utility.f32reg[0] * Utility.f32reg[0]);
        /*  second iteration */
        Utility.f32reg[0] *= (1.5 - half * Utility.f32reg[0] * Utility.f32reg[0]);
        return 1.0 /    Utility.f32reg[0];
};

/*  returns the next power of two value after given value */
MathLib.npot = function(val)
{
        var power_of_two = val;

        power_of_two = power_of_two - 1;
        power_of_two = power_of_two | (power_of_two >> 1);
        power_of_two = power_of_two | (power_of_two >> 2);
        power_of_two = power_of_two | (power_of_two >> 4);
        power_of_two = power_of_two | (power_of_two >> 8);
        power_of_two = power_of_two | (power_of_two >> 16);
        return power_of_two + 1;
};

/*  converts a radian value to degrees */
MathLib.radian_to_degree = function(r)
{
        return r * 57.2957795131;
};

/*  converts a degree value to radians */
MathLib.degree_to_radian = function(d)
{
        return d * 0.0174532925;
};

/*  compares equality between two values */
MathLib.fequals = function(v1, v2, e)
{
        return (v1 + e >= v2) && (v1 - e <= v2);
};

/*  linearly interpolates between two values */
MathLib.lerp = function(from, to, time)
{
        return from + (to - from) * time;
};

/* clamps the value between [0 , 1] */
MathLib.saturate = function(val)
{
        return val > 1.0 ? 1.0 : (val < 0.0 ? 0.0 : val);
};

/* clamps the value between [min , max] */
MathLib.clamp = function(val,  min,  max)
{
        return val > max ? max : (val < min ? min : val);
};