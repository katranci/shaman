/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        webgl texture class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function Texture(renderer) 
{
        this.renderer = renderer;
        this.context = this.renderer.get_context();
        this.texture = this.context.createTexture();
};

Texture.prototype.get_texture_object = function()
{
        return this.texture;
}

/*  update texture */
Texture.prototype.update = function(image_path)
{
        var image = new Image();
        image.texture = this;
        
        image.onload = function() {
            image.texture.renderer.bind_texture(0, image.texture);
            //image.texture.context.pixelStorei(image.texture.context.UNPACK_FLIP_Y_WEBGL, true);
            image.texture.context.texImage2D(image.texture.context.TEXTURE_2D, 0, image.texture.context.RGBA, image.texture.context.RGBA, image.texture.context.UNSIGNED_BYTE, image);
            image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_MIN_FILTER, image.texture.context.LINEAR_MIPMAP_LINEAR);
            image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_MAG_FILTER, image.texture.context.LINEAR);
            image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_WRAP_S, image.texture.context.CLAMP_TO_EDGE);
            image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_WRAP_T, image.texture.context.CLAMP_TO_EDGE);
            image.texture.context.generateMipmap(image.texture.context.TEXTURE_2D);
        }

        image.src = image_path;
};

/*  bind texture */
Texture.prototype.bind = function() 
{
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);
};