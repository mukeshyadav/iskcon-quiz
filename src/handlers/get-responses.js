const getAllResponses = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_CLOUD_FUNCTION_BASE_URL}/response`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  return responseData;
};

export default getAllResponses;
