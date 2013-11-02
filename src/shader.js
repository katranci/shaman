/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        webgl shader class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Shader(renderer)
{
        this.linked = false;
        this.context = renderer.get_context();
        this.program = this.context.createProgram();
};

/*  build shader */
Shader.prototype.build = function(vs_source, fs_source)
{
        var vs = this.context.createShader(this.context.VERTEX_SHADER);
        var fs = this.context.createShader(this.context.FRAGMENT_SHADER);
            
        if (this.linked) 
        {
                this.context.deleteProgram(program);
        }

        this.context.shaderSource(vs, vs_source);
        this.context.compileShader(vs);
        this.context.attachShader(this.program, vs);
        //console.log(this.context.getShaderInfoLog(vs));

        this.context.shaderSource(fs, fs_source);
        this.context.compileShader(fs);
        this.context.attachShader(this.program, fs);
        //console.log(this.context.getShaderInfoLog(fs));
          
        this.context.linkProgram(this.program);
        this.linked = true;
};

/*  bind shader */
Shader.prototype.bind = function()
{
        this.context.useProgram(this.program);
};

Shader.prototype.fill_uniform_locations = function(uniforms)
{
        for (var i = 0; i < uniforms.length; i++) 
        {
                uniforms[i].set_location(this.context.getUniformLocation(this.program, uniforms[i].get_name()));
        }
};

Shader.prototype.fill_attribute_locations = function(vertex)
{
        for (var i = 0; i < vertex.length; i++) 
        {

                vertex[i].set_location(this.context.getAttribLocation(this.program, vertex[i].get_name()));
        }
};