const BASE_URL = `https://pixabay.com/api`;

export async function fetchData(query) {
  const params = {
    key: "28003611-9cf284a06c2edb6302f7c03bc",
    image_type: "photo",
    prettry: "true",
    q: query,
  };

  return (await fetch(`${BASE_URL}?` + new URLSearchParams(params))).json();
}
