class UserService {
  dataUser = [
    {
      id: 1,
      name: "JohnSon",
      email: "johnson@gmail.com",
      age: 33,
      phone: "06661215454",
      access: "admin",
    },
    {
      id: 2,
      name: "Max lie",
      email: "maxlie12@gmail.com",
      age: 23,
      phone: "0913317626",
      access: "manager",
    },
    {
      id: 3,
      name: "Banh bao",
      email: "banhbao@gmail.com",
      age: 17,
      phone: "0933686893",
      access: "user",
    },
    {
      id: 4,
      name: "Banh mi",
      email: "banhmi@gmail.com",
      age: 27,
      phone: "0963743215",
      access: "user",
    },
    {
      id: 5,
      name: "Mì tôm",
      email: "mitom@gmail.com",
      age: 27,
      phone: "0963743265",
      access: "user",
    },
  ];

  getAllUsers() {
    return this.dataUser;
  }
  getUserById(id) {
    return this.dataUser.find((user) => user.id === id);
  }
  createNewId() {
    return this.dataUser.length > 0
      ? this.dataUser[this.dataUser.length - 1].id + 1
      : 1;
  }
  addUser(newUser) {
    return this.dataUser.push(newUser);
  }

  deleteById(id) {
    console.log(id);
    const index = this.dataUser.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.dataUser.splice(index, 1);
  }

  updateByUserId(updateUser) {
    const index = this.dataUser.findIndex((user) => user.id === updateUser.id);
    if (index !== -1) {
      this.dataUser[index] = {
        ...this.dataUser[index],
        ...updateUser,
      };
      return "Update succesfully";
    }
    return "someting is wrong in here";
  }
}
export default new UserService();
