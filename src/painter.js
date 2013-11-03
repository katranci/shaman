/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        webgl 2d painter class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Painter(renderer)
{
        this.quad = new Renderable();
        this.particle = new Renderable();
        this.shape = new Renderable();
        this.modelview = new Matrix4();
        this.projection = new Matrix4();
        this.colour = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.renderer = renderer;
        this.index_buffer = this.renderer.create_index_buffer([]);
        this.vertex_buffer = this.renderer.create_vertex_buffer([]);
        this.quad_index_data = [0, 1, 2, 0, 2, 3];
        this.quad_vertex_data = [-0.5, -0.5, 0.0, 0.0,
                                  0.5, -0.5, 1.0, 0.0, 
                                  0.5,  0.5, 1.0, 1.0,
                                 -0.5,  0.5, 0.0, 1.0];

        var shader = renderer.create_shader(sprite_vs_source, sprite_fs_source);

        this.projection.make_ortho(0.0, renderer.get_viewport_width(), renderer.get_viewport_height(), 0.0, -1.0, 1.0);
        this.projection.transpose();
        this.quad.add_uniform("projection", Uniform.MATRIX4, this.projection);
        this.quad.add_uniform("modelview", Uniform.MATRIX4, this.modelview);
        this.quad.add_uniform("texture", Uniform.SAMPLER, 0);
        this.quad.add_uniform("colour", Uniform.VECTOR4, this.colour);
        this.quad.add_vertex_attribute("position", 2, false);
        this.quad.add_vertex_attribute("texcoord", 2, false);
        this.quad.set_buffers(this.index_buffer, this.vertex_buffer);
        this.quad.set_shader(shader);

        shader = renderer.create_shader(particle_vs_source, particle_fs_source);

        this.particle.add_uniform("projection", Uniform.MATRIX4, this.projection);
        this.particle.add_uniform("modelview", Uniform.MATRIX4, this.modelview);
        this.particle.add_uniform("texture", Uniform.SAMPLER, 0);
        this.particle.add_uniform("colour", Uniform.VECTOR4, this.colour);
        this.particle.add_vertex_attribute("position", 2, false);
        this.particle.add_vertex_attribute("texcoord", 2, false);
        this.particle.add_vertex_attribute("alpha", 1, false);
        this.particle.set_buffers(this.index_buffer, this.vertex_buffer);
        this.particle.set_shader(shader);

        shader = renderer.create_shader(shape_vs_source, shape_fs_source);

        this.shape.add_uniform("projection", Uniform.MATRIX4, this.projection);
        this.shape.add_uniform("modelview", Uniform.MATRIX4, this.modelview);
        this.shape.add_uniform("colour", Uniform.VECTOR4, this.colour);
        this.shape.add_vertex_attribute("position", 2, false);
        this.shape.set_buffers(this.index_buffer, this.vertex_buffer);
        this.shape.set_shader(shader);

        var transform = new Transform();
        transform.set_scale(0.5, 0.5);
        //transform.set_translation(-450, -150);
        transform.calculate_matrix(this.modelview);
};

Painter.prototype.draw_particles = function(emitter)
{
        var texture = this.renderer.get_texture(emitter.get_sprite().get_image_path());
        this.vertex_buffer.update(emitter.get_vertex_data());
        this.index_buffer.update(emitter.get_index_data());
        this.colour.set_values(1.0, 1.0, 1.0, 1.0);
        this.renderer.bind_texture(0, texture);
        this.renderer.draw_renderable(this.particle, Renderer.SOLID);
};

Painter.prototype.draw_sprite = function(quad, sprite)
{
        var tex_coords = sprite.get_tile_coordinate();
        var current_point;

        this.renderer.bind_texture(0, this.renderer.get_texture(sprite.get_image_path()));
        this.colour.set_values(1.0, 1.0, 1.0, 1.0);
        for (var i = 0; i < 4; i++)
        {
                current_point = quad.get_corner(i);
                this.quad_vertex_data[i * 4] = current_point.get(0);
                this.quad_vertex_data[i * 4 + 1] = current_point.get(1);
                this.quad_vertex_data[i * 4 + 2] = tex_coords[i * 2];
                this.quad_vertex_data[i * 4 + 3] = tex_coords[i * 2 + 1];
        }
        this.vertex_buffer.update(this.quad_vertex_data);
        this.index_buffer.update(this.quad_index_data);
        this.renderer.draw_renderable(this.quad, Renderer.SOLID);
};

Painter.prototype.draw_polygon = function(polygon)
{
        var count = polygon.get_point_count();
        var vertices = [];
        var indices = [];
        var current_point;

        for (var i = 0; i < count; i++)
        {
                current_point = polygon.get_point(i);
                vertices.push(current_point.get(0));
                vertices.push(current_point.get(1));
                indices.push(i);
        }

        this.vertex_buffer.update(vertices);
        this.index_buffer.update(indices);
        this.renderer.draw_renderable(this.shape, Renderer.WIREFRAME);
};

Painter.prototype.draw_particles2 = function(emitter)
{
        var texture = this.renderer.get_texture(emitter.get_sprite().get_image_path());
        this.vertex_buffer.update(emitter.get_vertex_data());
        this.index_buffer.update(emitter.get_index_data());
        this.colour.set_values(1.0, 1.0, 1.0, 1.0);
        this.renderer.bind_texture(0, texture);
        this.renderer.draw_renderable(this.shape, Renderer.WIREFRAME);
};

Painter.prototype.draw_quad = function(quad)
{
        var vertices = [];
        var indices = [];
        var current_point;
        for (var i = 0; i < 4; i++)
        {
                current_point = quad.get_corner(i);
                vertices.push(current_point.get(0));
                vertices.push(current_point.get(1));
                indices.push(i);
        }
        this.vertex_buffer.update(vertices);
        this.index_buffer.update(indices);
        this.renderer.draw_renderable(this.shape, Renderer.WIREFRAME);
};