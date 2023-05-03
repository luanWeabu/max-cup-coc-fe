class ProductService {
  dataProduct = [
    {
      id: 1,
      name: "Cốc thủy tinh Max",
      type: "thủy tinh",
      origin: "Vietnam",
      time: "23 - 09 - 2023",
    },
    {
      id: 2,
      name: "Cốc gốm Thái sơn ",
      type: "cốc gốm",
      origin: "Trung quốc",
      time: "23 - 09 - 2023",
    },
    {
      id: 3,
      name: "Cốc Xứ Agentina",
      type: "cốc xứ",
      origin: "Argentina",
      time: "23 - 09 - 2023", //2023-
    },
    {
      id: 4,
      name: "Cốc Vàng Cổ 3 triệu năm",
      type: "Cốc ",
      origin: "Vietnam",
      time: "23 - 09 - 2023",
    },
    {
      id: 5,
      name: "Cốc giấy Sinh nhật",
      type: "Cốc giấy",
      origin: "Vietnam",
      time: "23 - 09 - 2023",
    },
    {
      id: 6,
      name: "Cốc in hoa tiết cực đẹp",
      type: "Cốc",
      origin: "Châu âu",
      time: "23 - 09 - 2023",
    },
  ];
  //lấy ra dánh sách của dataProduct
  getAllProducts() {
    return this.dataProduct;
  }
  //Lấy ra product theo id
  getProductById(id) {
    return this.dataProduct.find((product) => product.id === id);
  }
  //cập nhập sản phẩm theo id
  updateProductById(updatedProduct) {
    const index = this.dataProduct.findIndex(
      (product) => product.id === updatedProduct.id
    );
    // nếu sản phẩm !== 1 nghĩa là có tồn tại
    if (index !== -1) {
      //lấy sản phẩm theo từng index
      return (this.dataProduct[index] = {
        //tạo ra sản phẩm bản sao sau đó ghi đè lên bằng updateProduct(giá trị truyền vào)
        ...this.dataProduct[index],
        ...updatedProduct,
      });
    }
  }
  //xóa sản phẩm theo id
  deleteProduct(id) {
    //findIndex được sử dụng để tìm kiếm vị trí của product có id tương úng trong dataProduct
    //Nếu được tìm thấy phần tử tại vị trí đó sẽ bị xóa khỏi mảng bằng splice
    const index = this.dataProduct.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.dataProduct.splice(index, 1);
      return "Delete Successful";
    }
    return `Something is wrong of Product with ID ${id} not found`;
  }
  // them product
  addProduct(newProduct) {
    this.dataProduct.push(newProduct);
  }
  // khi tạo
  createNewId() {
    return this.dataProduct.length > 0
      ? this.dataProduct[this.dataProduct.length - 1].id + 1
      : 1;
  }
}

export default new ProductService();
