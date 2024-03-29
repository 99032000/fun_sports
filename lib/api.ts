import { social_booking } from '@prisma/client';

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
  id?: number;
  name: string;
  amount: number;
  booking_amount: number;
  price: number;
};
export type upsertEventBody = {
  id?: number;
  ownerId?: string;
  organizationId?: number;
  name?: string;
  address?: string;
  venue_name?: string | undefined;
  date?: Date;
  booking_groups?: event_group[];
  sports_typeId?: number;
  fee?: number;
  description?: string;
  images_url?: string[];
}
export type bookingInfo = {
  id: number;
  name: string;
  bookAmount: number;
  price: number;
};

type Peek<T> = {
  [K in keyof T]: T[K];
};
type TypeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type filteredSocialBooking = TypeOmit<social_booking,
  'social_eventId' | 'userId' | "booking_info" | "created_at"
  | "updated_at">;

export type PeekFilteredSocialBooking = Peek<filteredSocialBooking>;


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
export const upsertEvent = async (body: upsertEventBody) => {
  const response = await fetch(`/api/events`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const bookEvent = async (body: bookingInfo[], eventId: number) => {
  const response = await fetch(`/api/events/${eventId}/book`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const socialBookUpdate = async (body: PeekFilteredSocialBooking) => {
  const response = await fetch(`/api/social_booking`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const deleteBooking = async (id: number) => {
  const response = await fetch(`/api/social_booking/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
