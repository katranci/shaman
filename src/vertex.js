/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        vertex attribute class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Vertex(name, size, normalized) 
{
        this.location = -1;
        this.name = name;
        this.size = size;
        this.normalized = normalized;
};

/*  set location of vertex attribute in shader */
Vertex.prototype.set_location = function(new_location)
{
        this.location = new_location;
};

/*  returns location of vertex attribute in shader */
Vertex.prototype.get_location = function()
{
        return this.location
};

/*  vertex attribute's name in shader */
Vertex.prototype.get_name = function() 
{
        return this.name;
};

/*  number of elements */
Vertex.prototype.get_size = function()
{
        return this.size;
};

/*  is client data normalized? */
Vertex.prototype.is_normalized = function()
{
        return this.normalized;
};