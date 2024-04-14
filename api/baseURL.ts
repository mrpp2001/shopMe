export const BASE_URL = "https://fakestoreapi.com/";

export const makeRequest = async (
  url: string,
  method: string,
  token: string,
  data: any = ""
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: method === "GET" ? null : JSON.stringify(data),
    });

    console.log("USER DATA: ", data);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const makeDeleteRequest = async (
  url: string,
  token: string
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
