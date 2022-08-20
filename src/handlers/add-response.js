export const createResponse = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_CLOUD_FUNCTION_BASE_URL}/response/create`,
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();

  return {
    ...responseData,
    status: response.status,
  };
};
