import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const schema = z.object({
  organisation: z.string(),
  name: z.string(),
  sport_type: z.string(),
  data: z.date(),
  address: z.string(),
  venue: z.string(),
  fee: z.number(),
  description: z.string(),
  images: z.any().refine((files) => {
    return true;
    let result = false;

    if (files.length > 0) {
      for (let image of files) {
        if (image.size > 6291456) {
          result = true;
        }
      }
    }

    return false;
  }, "Image size should be less than 6MB"),
});

export const resolver = zodResolver(schema);
