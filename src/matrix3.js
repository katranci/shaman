/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        3x3 matrix class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Matrix3.prototype = new Matrix(3);
Matrix3.prototype.constructor = Matrix3;
function Matrix3(m11, m12, m13, m21, m22, m23, m31, m32, m33)
{
        Matrix.call(this, 3);
        this.elements[0] = m11;
        this.elements[1] = m12;
        this.elements[2] = m13;
        this.elements[3] = m21;
        this.elements[4] = m22;
        this.elements[5] = m23;
        this.elements[6] = m31;
        this.elements[7] = m32;
        this.elements[8] = m33;
};

Matrix3.prototype.to_matrix4 = function()
{
        return new Matrix4(this.elements[0], this.elements[1], this.elements[2], 0.0,
                           this.elements[3], this.elements[4], this.elements[5], 0.0,
                           this.elements[6], this.elements[7], this.elements[8], 0.0,
                           0.0,              0.0,              0.0,              1.0);
};