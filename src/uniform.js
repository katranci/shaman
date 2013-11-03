/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        shader uniform class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Uniform(name, type, data)
{
        this.location = -1;
        this.name = name;
        this.type = type;
        this.data = data;
};

Uniform.SAMPLER = 0;
Uniform.FLOAT = 1;
Uniform.VECTOR2 = 2;
Uniform.VECTOR3 = 3;
Uniform.VECTOR4 = 4;
Uniform.MATRIX2 = 5;
Uniform.MATRIX3 = 6;
Uniform.MATRIX4 = 7;

/*  set location of uniform in shader */
Uniform.prototype.set_location = function(new_location)
{
        this.location = new_location;
};
/*  returns location of uniform in shader */
Uniform.prototype.get_location = function()
{
        return this.location
};
/*  name of uniform in shader */
Uniform.prototype.get_name = function()
{
        return this.name;
};
/*  type of uniform data */
Uniform.prototype.get_type = function()
{
        return this.type;
};
/*  data to feed uniform */
Uniform.prototype.get_data = function()
{
        return this.data;
};