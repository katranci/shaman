/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        webgl buffer class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Buffer(renderer, type, usage)
{
        this.context = renderer.get_context();
        this.renderer = renderer;
        this.buffer = this.context.createBuffer();
        this.target = [this.context.ARRAY_BUFFER, this.context.ELEMENT_ARRAY_BUFFER][type];
        this.usage = (usage)?(usage):this.context.STATIC_DRAW;
        this.size = 0,
        this.buffer_type = type;
};

Buffer.VERTEX_BUFFER = 0;
Buffer.INDEX_BUFFER = 1;

/*  returns type of the buffer */
Buffer.prototype.get_buffer_type = function()
{
        return this.buffer_type;
};

/*  returns buffer object */
Buffer.prototype.get_buffer_object = function()
{
        return this.buffer;
};

Buffer.prototype.get_size = function()
{
        return this.size;
}

/*  update buffer data */
Buffer.prototype.update = function(data)
{
        this.renderer.bind_buffer(this);
        var array = (this.buffer_type === Buffer.VERTEX_BUFFER) ? (new Float32Array(data)) : (new Uint16Array(data));
        this.context.bufferData(this.target, array, this.usage);
        this.size = data.length;
};

/*  bind buffer for execution */
Buffer.prototype.bind = function()
{
        this.context.bindBuffer(this.target, this.buffer);
};