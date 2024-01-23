import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreatedProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createdProduct, { isLoading: loadingCreate }] =
    useCreatedProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  async function deleteHandler(id) {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }
  async function createProductHandler() {
    if (window.confirm("Are you sure you want to crate a new product?")) {
      try {
        await createdProduct();
        refetch();
      } catch (error) {
        toast.error(error.message || error.error);
      }
    }
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler}>
            <FaEdit></FaEdit> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader></Loader>}
      {loadingCreate && <Loader></Loader>}
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table bordered striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th>{product._id}</th>
                  <th>{product.name}</th>
                  <th>{product.price}</th>
                  <th>{product.category}</th>
                  <th>{product.brand}</th>
                  <th>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit></FaEdit>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="light"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash></FaTrash>
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
