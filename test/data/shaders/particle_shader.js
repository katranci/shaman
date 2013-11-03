var particle_vs_source = 
        "attribute vec2 position;" +
        "attribute vec2 texcoord;" +
        "attribute float alpha;" +
        "uniform mat4 projection;" +
        "uniform mat4 modelview;" +
        "varying vec2 coords;" +
        "varying float a;" +
        "void main(void) " +
        "{" +
        "        coords = texcoord;" +
        "        a = alpha;" +
        "        gl_Position =  projection * modelview * vec4(position, 0.0, 1.0);" +
        "}";

var particle_fs_source =
        "precision   mediump float;" +
        "uniform sampler2D texture;" +
        "uniform vec4 colour;" +
        "varying vec2 coords;" +
        "varying float a;" +
        "void main(void) " +
        "{" +
        "        gl_FragColor = texture2D(texture, coords) * colour * vec4(1.0, 1.0, 1.0, a);" +
        "}";