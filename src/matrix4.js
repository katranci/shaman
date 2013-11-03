/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        4x4 matrix class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Matrix4.prototype = new Matrix(4);
Matrix4.prototype.constructor = Matrix4;
function Matrix4(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44)
{
        Matrix.call(this, 4);
        this.elements[0] = m11; 
        this.elements[1] = m12; 
        this.elements[2] = m13; 
        this.elements[3] = m14; 
        this.elements[4] = m21; 
        this.elements[5] = m22; 
        this.elements[6] = m23; 
        this.elements[7] = m24; 
        this.elements[8] = m31; 
        this.elements[9] = m32; 
        this.elements[10] = m33; 
        this.elements[11] = m34; 
        this.elements[12] = m41; 
        this.elements[13] = m42; 
        this.elements[14] = m43; 
        this.elements[15] = m44; 
};

/* creates perspective projection matrix */
Matrix4.prototype.make_perspective = function(field_of_view, aspect_ratio, near_plane, far_plane)
{
        var top = near_plane * Math.tan(MathLib.degree_to_radian(field_of_view * 0.5));
        var bottom = -top;
        var left = bottom * aspect_ratio;
        var right = top * aspect_ratio;

        this.zero();
        this.elements[0] = (2.0 * near_plane) / (right - left);
        this.elements[2] = (right + left) / (right - left);
        this.elements[5] = (2.0 * near_plane) / (top - bottom);
        this.elements[6] = (top + bottom) / (top - bottom);
        this.elements[10] = (far_plane + near_plane) / (near_plane - far_plane);
        this.elements[11] = (2.0 * far_plane * near_plane) / (near_plane - far_plane);
        this.elements[14] = -1.0;
};

/* creates orthographic projection matrix */
Matrix4.prototype.make_ortho = function(left_plane, right_plane, bottom_plane, top_plane, near_plane, far_plane)
{
        this.identity();
        this.elements[0] = 2.0 / (right_plane - left_plane);
        this.elements[3] = -(right_plane + left_plane) / (right_plane - left_plane);
        this.elements[5] = 2.0 / (top_plane - bottom_plane);
        this.elements[7] = -(top_plane + bottom_plane) / (top_plane - bottom_plane);
        this.elements[10] = 2.0 / (near_plane - far_plane);
        this.elements[11] = -(far_plane + near_plane) / (far_plane - near_plane);
};

/* creates translation matrix */
Matrix4.prototype.make_translation = function(translation)
{
        this.identity();
        this.elements[3] = translation.get(0);
        this.elements[7] = translation.get(1);
        this.elements[11] = translation.get(2);
};

/* creates scale matrix */
Matrix4.prototype.make_scale = function(scale)
{
        this.identity();
        this.elements[0] = scale.get(0);
        this.elements[5] = scale.get(1);
        this.elements[10] = scale.get(2);
};

/*  create rotation matrix */
Matrix4.prototype.make_rotation = function(angle)
{
        this.identity();
        this.elements[0] = Math.cos(MathLib.degree_to_radian(angle));
        this.elements[1] = -Math.sin(MathLib.degree_to_radian(angle));
        this.elements[4] = Math.sin(MathLib.degree_to_radian(angle));
        this.elements[5] = Math.cos(MathLib.degree_to_radian(angle));
};