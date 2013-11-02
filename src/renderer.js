/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        webgl renderer class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Renderer(viewport)
{
        this.context = viewport.getContext("webgl", {alpha:false});
        this.viewport = viewport;

        /* used to avoid blind binding */
        this.tex_units = [];
        this.active_buffers = [];
        this.active_shader;
        this.textures = [];

        this.draw_modes = [this.context.TRIANGLES, this.context.LINE_LOOP];

        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.viewport(0, 0, viewport.width, viewport.height);
        this.context.enable(this.context.DEPTH_TEST);
        this.context.depthFunc(this.context.LEQUAL);
        this.context.enable(this.context.BLEND);
        this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE_MINUS_SRC_ALPHA);
};

Renderer.SOLID = 0;
Renderer.WIREFRAME = 1;

Renderer.prototype.clear_buffers = function()
 {
         this.context.clear(this.context.COLOR_BUFFER_BIT);
 };

 /*  returns webgl context */
 Renderer.prototype.get_context = function() 
 {
         return this.context;
 };

 Renderer.prototype.get_viewport_width = function()
 {
         return this.viewport.width;
 };

 Renderer.prototype.get_viewport_height = function()
 {
         return this.viewport.height;
 };

 /*  returns a texture from image path */
 Renderer.prototype.get_texture = function(image_path) 
 {
         var texture;

         if (this.textures[image_path] !== undefined)
         {
                 return this.textures[image_path];
         }
         texture = new Texture(this);
         texture.update(image_path);
         this.textures[image_path] = texture;
         return texture;
 };

 /*  creates an returns a shader from source */
 Renderer.prototype.create_shader = function(vs_source, fs_source)
 {
         var shader;

         shader = new Shader(this);
         shader.build(vs_source, fs_source);
         return shader;
 };

 /*  creates an returns a vertex buffer from data */
 Renderer.prototype.create_vertex_buffer = function(data)
 {
         var buffer;

         buffer = new Buffer(this, Buffer.VERTEX_BUFFER);
         buffer.update(data)
         return buffer;
 };

 /*  creates an returns an index buffer from data */
 Renderer.prototype.create_index_buffer = function(data)
 {
         var buffer;

         buffer = new Buffer(this, Buffer.INDEX_BUFFER);
         buffer.update(data)
         return buffer;
 };

 /*  binds a texture to specified texture unit */
 Renderer.prototype.bind_texture = function(tex_unit, texture)
 {
         if (this.tex_units[tex_unit] !== texture)
         {
                 this.tex_units[tex_unit] = texture;
                 this.context.activeTexture(this.context.TEXTURE0 + tex_unit);
                 texture.bind();
         }
 };

 /*  binds a shader */
 Renderer.prototype.bind_shader = function(shader)
 {
         if (this.active_shader !== shader)
         {
                 this.active_shader = shader;
                 shader.bind();
         }
 };

 /*  binds a buffer */
 Renderer.prototype.bind_buffer = function(buffer)
 {
         if (this.active_buffers[buffer.get_buffer_type()] !== buffer)
         {
                 this.active_buffers[buffer.get_buffer_type()] = buffer;
                 buffer.bind();
         }
 };

 Renderer.prototype.bind_uniforms = function(uniforms)
 {
         var data;
         var type;

         for (var i = 0; i < uniforms.length; i++)
         {
                 type = uniforms[i].get_type();
                 if (type > Uniform.FLOAT)
                 {
                         data = new Float32Array(uniforms[i].get_data().get_array());
                 }
                 else if (type === Uniform.FLOAT)
                 {
                         data = uniforms[i].get_data().get(0);
                 }
                 switch(uniforms[i].get_type())
                 {
                         case Uniform.SAMPLER:
                                 this.context.uniform1i(uniforms[i].get_location(), uniforms[i].get_data());
                                 break;
                         case Uniform.FLOAT:
                                 this.context.uniform1f(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.VECTOR2:
                                 this.context.uniform2fv(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.VECTOR3:
                                 this.context.uniform3fv(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.VECTOR4:
                                 this.context.uniform4fv(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.MATRIX2:
                                 this.context.uniformMatrix2fv(uniforms[i].get_location(), false, data);
                                 break;
                         case Uniform.MATRIX3:
                                 this.context.uniformMatrix3fv(uniforms[i].get_location(), false, data);
                                 break;
                         case Uniform.MATRIX4:
                                 this.context.uniformMatrix4fv(uniforms[i].get_location(), false, data);
                                 break;
                         default:
                 }
         }
 };

 Renderer.prototype.bind_vertex = function(vertex, vertex_size)
 {
         var location;
         var offset = 0;

         for (var i = 0; i < vertex.length; i++)
         {
                 location = vertex[i].get_location();
                 this.context.enableVertexAttribArray(location);
                 this.context.vertexAttribPointer(location, vertex[i].get_size(), this.context.FLOAT, false, vertex_size, offset);
                 offset += vertex[i].get_size() * 4;
         }
 }

 /*  draws renderable */
 Renderer.prototype.draw_renderable = function(renderable, mode)
 {
         var index_buffer = renderable.get_index_buffer();
         var draw_mode = (mode !== undefined) ? (this.draw_modes[mode]) : (this.context.LINE_LOOP);

         this.bind_buffer(index_buffer);
         this.bind_buffer(renderable.get_vertex_buffer());
         this.bind_shader(renderable.get_shader());
         this.bind_uniforms(renderable.get_uniforms());
         this.bind_vertex(renderable.get_vertex(), renderable.get_vertex_size());
         this.context.drawElements(draw_mode, index_buffer.get_size(), this.context.UNSIGNED_SHORT, 0);                
 };