/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        square matrix base class
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
Matrix.prototype = new Tuple();
Matrix.prototype.constructor = Matrix;
function Matrix(dim)
{
        Tuple.call(this, dim * dim);
        this.dim = dim;
};

/* returns element in i,j */
Matrix.prototype.get_ij = function(i, j)
{
        return this.elements[i * this.dim + j];
};

/* sets element in i,j */
Matrix.prototype.set_ij  = function(i, j, val)
{
        this.elements[i * this.dim + j] = val;
};

/* matrix-matrix multiplication */
Matrix.prototype.mul = function(m1, m2)
{
        var temp = new Matrix(this.dim);

        temp.zero();
        for (var i = 0; i < this.dim; i++)
        {
                for (var j = 0; j < this.dim; j++)
                {
                        for (var n = 0; n < this.dim; n++)
                        {
                                temp.set_ij(i, j, temp.get_ij(i, j) + m1.get_ij(i, n) * m2.get_ij(n, j));
                        }
                }
        }
        this.copy(temp);
};

/* makes identity matrix */
Matrix.prototype.identity = function()
{
        this.zero();
        for (var i = 0; i < this.dim; i++) 
        {
                this.set_ij(i, i, 1.0);
        }
};

/* returns the transpose of matrix */
Matrix.prototype.transpose = function()
{ 
        var temp = new Matrix(this.dim);
        for (var i = 0; i < this.dim; i++)
        {
                for (var j = 0; j < this.dim; j++)
                {
                        temp.set_ij(i, j, this.get_ij(j, i));
                }
        }
        this.copy(temp);
};