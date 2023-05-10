export const getUserByEmail = async (email: string) => {
  const response = await fetch(
    `/api/user/findByEmail?` + new URLSearchParams({ email })
  );
  return await response.json();
}