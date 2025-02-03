function loginValidation() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && !username) {
      localStorage.removeItem("token");
    }
}

export default loginValidation