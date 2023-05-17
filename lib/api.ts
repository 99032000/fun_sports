export type updateUserBody = {
  userId: string;
  userInfo: {
    name?: string;
    phone?: string;
    wechatId?: string;
  };
  hobbies: hobby_type[]
}

export type hobby_type = {
  sports_typeId: number;
  sports_name: string;
  level: number;
};

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

export const getSportsTypes = async () => {
  const response = await fetch(
    `/api/sportsType`
  );
  return await response.json();
}

export const updateUser = async (body: any) => {
  const response = await fetch("/api/user/updateUser", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const deleteHobby = async (id: number) => {
  const response = await fetch(`/api/hobbies/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}