/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        2x2 matrix class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Matrix2.prototype = new Matrix(2);
Matrix2.prototype.constructor = Matrix2;
function Matrix2(m11, m12, m21, m22)
{
        Matrix.call(this, 2);
        this.elements[0] = m11;
        this.elements[1] = m12;
        this.elements[2] = m21;
        this.elements[3] = m22;
};

Matrix2.prototype.to_matrix3 = function()
{
        return new Matrix3(this.elements[0], this.elements[1], 0.0,
                           this.elements[2], this.elements[3], 0.0,
                           0.0,              0.0,              1.0);
};

Matrix2.prototype.to_matrix4 = function()
{
        return new Matrix4(this.elements[0], this.elements[1], 0.0, 0.0,
                           this.elements[2], this.elements[3], 0.0, 0.0,
                           0.0,              0.0,              1.0, 0.0,
                           0.0,              0.0,              0.0, 1.0);
};