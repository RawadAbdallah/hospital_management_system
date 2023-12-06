import axios from "axios";

 const sendRequest = async ({ route, body, method = "GET" }) => {
  try {
    const response = await axios.request({
      url: `http://localhost/hospital_management_system/backend/${route}.php`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default sendRequest