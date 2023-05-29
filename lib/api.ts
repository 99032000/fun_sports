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
export type upsertOrganizationBody = {
  id?: number;
  name?: string;
  wechatId?: string;
  phone?: string;
  userId?: string;
  sports_typeId?: number;
  description?: string;
  avatar_url?: string;
}
export type event_group = {
  name: string;
  amount: number;
  booking_amount: number;
};
export type createEventBody = {
  ownerId: string;
  organizationId: number;
  name: string;
  address: string;
  venue_name: string | undefined;
  date: Date;
  booking_groups: event_group[];
  sports_typeId: number;
  fee: number;
  description?: string;
}


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

export const updateUser = async (body: updateUserBody) => {
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

export const upsertOrganization = async (body: upsertOrganizationBody) => {
  const response = await fetch(`/api/organizations`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const deleteOrganization = async (id: number) => {
  const response = await fetch(`/api/organizations/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
export const deleteEvent = async (id: number) => {
  const response = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
export const createEvent = async (body: createEventBody) => {
  const response = await fetch(`/api/events`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();

}