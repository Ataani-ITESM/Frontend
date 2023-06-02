export async function checkServerConnection(url) {
  try {
    console.log("trying to connect to:", url);
    const response = await fetch(url, { method: "HEAD", mode: "no-cors" });

    console.log("response:", response);
    return response.status >= 200 && response.status < 300; // Return true if we get a HTTP status in the OK range
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
}
