const options: object = {
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://prismagram-backend-damian.herokuapp.com/",
};

export default options;
