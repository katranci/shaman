/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        renderable class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Renderable()
{
        this.uniforms = [];
        this.vertex = [];
        this.vertex_size = 0;

        this.shader;
        this.index_buffer;
        this.vertex_buffer;
};

/*  add vertex attribute to shader */
Renderable.prototype.add_vertex_attribute = function(name, size, normalized) 
{
        this.vertex.push(new Vertex(name, size, normalized));
        this.vertex_size += size * 4;
};

/*  add uniform to shader */
Renderable.prototype.add_uniform = function(name, type, data)
{
        this.uniforms.push(new Uniform(name, type, data));
};

Renderable.prototype.set_shader = function(shader)
{
        this.shader = shader;
        this.shader.fill_uniform_locations(this.uniforms);
        this.shader.fill_attribute_locations(this.vertex);
};

Renderable.prototype.set_buffers = function(ib, vb)
{
        this.index_buffer = ib;
        this.vertex_buffer = vb;
};

Renderable.prototype.get_shader = function()
{
        return this.shader;
};

Renderable.prototype.get_vertex_buffer = function()
{
        return this.vertex_buffer;
};

Renderable.prototype.get_index_buffer = function()
{
        return this.index_buffer;
};

Renderable.prototype.get_uniforms = function()
{
        return this.uniforms;
};

Renderable.prototype.get_vertex = function()
{
        return this.vertex;
};

Renderable.prototype.get_vertex_size = function()
{
        return this.vertex_size;
};