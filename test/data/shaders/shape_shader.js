var shape_vs_source = 
        "attribute vec2 position;" +
        "uniform mat4 projection;" +
        "uniform mat4 modelview;" +
        "void main(void) " +
        "{" +
                "gl_Position =  projection * modelview * vec4(position, 0.0, 1.0);" +
        "}";

var shape_fs_source =
        "precision mediump float;" +
        "uniform vec4 colour;" +
        "void main(void) " +
        "{" +
                "gl_FragColor = vec4(colour);" +
        "}";