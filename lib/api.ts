export const getUserByEmail = async (email: string) => {
  const response = await fetch(
    `/api/user/findByEmail?` + new URLSearchParams({ email })
  );
  return await response.json();
}

export const getUserById = async (id: string) => {
  const response = await fetch(
    `/api/user/findById?` + new URLSearchParams({ id })
  );
  return await response.json();
}