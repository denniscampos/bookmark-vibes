export type CategoryPayloadType = {
  data?: {
    name: string | null;
    id: string | null;
  }[];
  error: string;
};

export type BookmarkPayload = {
  id: string;
  url: string | null;
  title: string | null;
  category_id: string | null;
  category_name: string | null;
};

export type CategoryPayload = {
  name: string | null;
  id: string;
}[];
