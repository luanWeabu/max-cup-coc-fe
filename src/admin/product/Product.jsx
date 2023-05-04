import React, { useMemo } from "react";
import { useState } from "react";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CreateProduct from "./ProductForm";
import productService from "../services/ProductService";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Product() {
  // Để là state để làm gì?
  // products lấy ra list product và setProduct thay đổi product đó
  // product ở đây được hiển thị giá trị tại ProductService.getAllProduct() tại đây nó sẽ hiển thị các giá trị product
  const [products, setProducts] = useState(productService.getAllProducts());

  // Để làm gì?
  //giá trị page ở đây được hiển thị số trang
  const [page, setPage] = useState(0);
  //giá trị rowsPerPage được hiển thị ra số sản phẩm trên 1 trang
  //setRowsPerPage ở đây được sử dụng thay đổi , cập nhập giá trị
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //total ở đây hiển thị số độ dài của products
  const [total, setTotal] = useState(products.length);
  //open ở đây dược sử dụng như một công tắc
  // Trong component này open và setOpen được sử dung khi bật tắt hiển thị Dialog Form Create or Update
  const [open, setOpen] = useState(false);
  // currentProductId dùng để theo dõi sản phẩm được chọn hiện tại trong ứng dụng
  // Khi được chọn giá trị này sẽ được cập nhập giá trị chứa ID của sản phẩm hiện tại
  // Nếu không có sản phẩm được chọn giá trị sẽ là null
  const [currentProductId, setCurrentProductId] = useState(null);

  // hàm trên được sử dụng khi thay đổi Trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // hàm này được sử dụng khi thay đổi cột trong từng trang
  const handleChangeRowsPerPage = (event) => {
    //xử lýthay đổi số hàng hiển thị trên mỗi trang
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const refreshProducts = () => {
    // Xử lý việc refresh lại danh sách product
    const newProductList = productService.getAllProducts(); // ...

    // Xử lý cache (lưu) lại product vào trong state của component product
    setProducts(newProductList); // ko return, param là: []

    // tổng số product trong database
    setTotal(newProductList.length); // ko return, param là: 100
  };

  const showEditProductDialog = (productId) => {
    // cập nhập giá trị của biến curentProductId truyền vào productId
    setCurrentProductId(productId);
    // hiển thị dialog
    setOpen(true);
  };

  //Xử lý cập nhập danh sách
  const updateProduct = (updateProduct) => {
    // Gọi updateProductById để cập nhập sản phẩm
    productService.updateProductById(updateProduct);

    //lấy ra các sản phẩm đã có
    const newProductList = productService.getAllProducts();
    // cập nhập danh sahcs sản phẩm trong state của component
    setProducts(newProductList);
    // Cập nhập số lượng sản phẩm trong state component
    setTotal(newProductList.length);
  };

  //Xử lý khi xóa sản phẩm
  const deleteProduct = (productId) => {
    productService.deleteProduct(productId);
    //Sau khi xử lý xóa sản phẩm dự theo productId thì sẽ refresh lại danh sách product
    refreshProducts();
  };
  // useMemo được sử dụng để tạo và lưu trữ các cột trong bảng dữ liệu
  // column này ở đây được sử dụng như một đối tượng mô tả một cột và các thuộc tính
  const columns = useMemo(() => {
    return [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "type",
        label: "Type",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "origin",
        label: "Origin",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "price",
        label: "Price",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "time",
        label: "Time",
        minWidth: 170,
        align: "center",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        id: "url_img",
        label: "Image",
        minWidth: 170,
        align: "center",
        format: (value) => <img src={value} style={{ width: "30px" }} />,
      },
      {
        id: "action",
        label: "action",
        minWidth: 170,
        align: "center",
        // IconButton được lắng nghe sự kiện onClick và nhận vào một id khi Click vào
        // Với form IconButton được nhận sẽ hiển thị EditPRoductDiaglog hoặc là deleteProduct theo id
        format: (value, product) => (
          <>
            <IconButton onClick={() => showEditProductDialog(product.id)}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ];
  }, [showEditProductDialog]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button
        variant="outlined"
        style={{ background: "white", color: "blue", margin: 20 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Create product
      </Button>
      {/* gọi component CreateProduct và truyền prop vào để xử dụng component con của nó tại đây */}
      <CreateProduct
        // truyền vào currentProductId hiện tại khi xử lý các thao tác trong CreatePRoduct
        //truyền vào refreshProduct khi xử lý
        currentProductId={currentProductId}
        refreshProducts={refreshProducts}
        open={open}
        // khi tắt dialog chương trình thực thi sẽ tự setCurrentProductId trở lại thành null
        // tắt Dialog bằng cách setOpen(false)
        handleClose={() => {
          setCurrentProductId(null);
          setOpen(false);
        }}
        updateProduct={updateProduct}
      />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead style={{ backgroundColor: "black" }}>
            <TableRow>
              {columns.map((comlumn) => (
                <TableCell
                  key={comlumn.id}
                  align="center"
                  style={{ minWidth: columns.minWidth, color: "white" }}
                >
                  {comlumn.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                  >
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ background: "white", color: "black" }}
                        >
                          {column.format
                            ? column.format(value, product)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
