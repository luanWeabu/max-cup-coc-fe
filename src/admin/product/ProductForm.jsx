import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import productService from "../services/ProductService";
//function CreateProduct nhận vào một prop để lấy các dữ liệu từ component cha để xử lý
function ProductForm(props) {
  // nhận vào giá trị chứa một Object và các thuộc tính được khởi tạo
  const [productFormData, setProductFormData] = useState({
    id: props.currentProductId ? props.currentProductId : "",
    name: "",
    type: "",
    origin: "",
    price: "",
    time: "",
    url_img: "",
  });

  const [open, setOpen] = useState(props.open);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isProductUpdated, setIsProductUpdated] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({
    ...productFormData,
  });

  //Đoạn mã này được sử dụng React Hook useEffect để xử lý các hành động khi component render
  //Nếu giá trị có tồn tại thì setPoriductFormData và setOriginalFormData sẽ được sử dụng để cập nhập giá trị
  useEffect(() => {
    if (props.currentProductId) {
      const product = productService.getProductById(props.currentProductId);
      if (product) {
        setProductFormData({
          id: product.id,
          name: product.name,
          type: product.type,
          origin: product.origin,
          time: product.time,
        });
        setOriginalFormData({
          id: product.id,
          name: product.name,
          type: product.type,
          origin: product.origin,
          time: product.time,
        });
      }
      //Nếu giá trị không tồn tại sẽ để mặc định cho các thuộc tính là rông ""
    } else {
      setProductFormData({
        id: "",
        name: "",
        type: "",
        origin: "",
        price: "",
        time: "",
        url_img: "",
      });
      setOriginalFormData({
        id: "",
        name: "",
        type: "",
        origin: "",
        price: "",
        time: "",
        url_img: "",
      });
    }
    setIsProductUpdated(false);
  }, [props.currentProductId]);

  //Dùng để đóng Dialog hoặc modal
  const handleClose = () => {
    props.handleClose();
    // cập nhập lại component cha sau khi có sự thay đổi
    props.refreshProducts();
  };

  //thiết lập giá trị isProductUpdate thành false mỗi khi giá trị của biến open thay đổi
  useEffect(() => {
    setIsProductUpdated(false);
  }, [open]);

  //Object.values(productFormData) được sử dụng để rtuy cập vào tất cả các giá trị của object productFromdata
  // hàm some được sử dụng để kiểm tra xem có ít nhất một giá trị nào khác rỗng hay không
  //thiết lặp giá trị isFromvalid bằng giá trị của hasChange.
  //Nếu giá trị của hasChange true nó cũng sẽ true và ngược lại
  useEffect(() => {
    const hasChanges = Object.values(productFormData).some(
      (value) => value !== ""
    );
    setIsFormValid(hasChanges);
  }, [productFormData]);

  //đây là hàm để xử lý khi thêm product vào
  const handleAddProduct = () => {
    const newId = productService.createNewId();
    //sao chép các giá trị của productFormData và thêm một thuộc tính id mới được tạo ra
    const product = { ...productFormData, id: newId };
    productService.addProduct(product);
    //set lại giá trị thành ban đầu
    setProductFormData({
      id: "",
      name: "",
      type: "",
      origin: "",
      price: "",
      time: "",
      url_img: "",
    });
    //dùng để đóng cửa sổ
    props.handleClose();
    // làm mới danh sách
    props.refreshProducts();
  };
  //đây là hàm xử lý khi thêm product vào
  const handleUpdateProduct = () => {
    //cập nhập product khi truyền vào
    const updateProduct = {
      id: productFormData.id,
      name: productFormData.name,
      type: productFormData.type,
      origin: productFormData.origin,
      price: productFormData.price,
      time: productFormData.time,
    };
    //
    const success = productService.updateProductById(updateProduct);
    //xem product theo id có tồn tại hay không nếu có nó sẽ setIsProductId thành true
    //làm mới lại danh sách product
    if (success) {
      setIsProductUpdated(true);
      props.refreshProducts();
      props.handleClose();
      setOpen(false);
    }
    //làm mới lại danh sách productFromData
    props.refreshProducts(productFormData);
  };

  //Hàm xử lý khi bấm nút
  const handleSubmit = async (e) => {
    //e được sử dụng để ngăn chặn hành động mặc định của form khi được submit
    e.preventDefault();
    //Nếu như tồn tại id nó sẽ hiển thị dialog Edit và không sẽ hiển thị Create Product
    if (productFormData.id) {
      handleUpdateProduct(productFormData);
    } else {
      handleAddProduct();
    }
  };
  //Object.keys để lấy ra tất cả các thuộc tính keys của đối tượng productFromData
  //some trả về giá trị tue khi ít nhất một phần tử trong mảng truyền vào thỏa mãn điều kiện callback
  const hasFormChange = Object.keys(productFormData).some(
    (key) => productFormData[key] !== originalFormData[key]
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductFormData({
        ...productFormData,
        image: reader.result,
      });
    };
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>
          {productFormData.id ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="name"
            type="text"
            fullWidth
            name="name"
            value={productFormData.name}
            onChange={(e) =>
              setProductFormData({ ...productFormData, name: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="type"
            type="text"
            fullWidth
            name="type"
            value={productFormData.type}
            onChange={(e) =>
              setProductFormData({ ...productFormData, type: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="origin"
            type="text"
            fullWidth
            name="origin"
            value={productFormData.origin}
            onChange={(e) =>
              setProductFormData({ ...productFormData, origin: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="price"
            type="number"
            fullWidth
            name="price"
            value={productFormData.price}
            onChange={(e) =>
              setProductFormData({ ...productFormData, price: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="time"
            type="date"
            fullWidth
            name="time"
            value={productFormData.time}
            onChange={(e) => {
              setProductFormData({ ...productFormData, time: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="url_img"
            type="text"
            fullWidth
            name="url_img"
            value={productFormData.url_img}
            onChange={(e) => {
              setProductFormData({
                ...productFormData,
                url_img: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {productFormData.id ? (
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || !hasFormChange}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || !hasFormChange}
            >
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductForm;
