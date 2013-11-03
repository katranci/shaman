var sprite_vs_source = 
        "attribute vec2 position;" +
        "attribute vec2 texcoord;" +
        "uniform mat4 projection;" +
        "uniform mat4 modelview;" +
        "varying vec2 coords;" +
        "void main(void) " +
        "{" +
        "        coords = texcoord;" +
        "        gl_Position =  projection * modelview * vec4(position, 0.0, 1.0);" +
        "}";

var sprite_fs_source =
        "precision mediump float;" +
        "uniform sampler2D texture;" +
        "uniform vec4 colour;" +
        "varying vec2 coords;" +
        "void main(void) " +
        "{" +
        "        gl_FragColor = texture2D(texture, coords) * colour;" +
        "}";