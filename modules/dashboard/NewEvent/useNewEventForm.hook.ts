import { useForm } from "react-hook-form";
import { resolver } from "./NewEventForm.schema";
import { useEffect } from "react";

export function useNewEventForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      organisation: "",
      name: "",
      sport_type: "",
      data: new Date(),
      address: "",
      venue: "",
      fee: 0,
      description: "",
      images: [],
    },
    resolver,
  });

  useEffect(() => {
    console.debug(errors);
  }, [errors]);

  const onSubmit = handleSubmit((data) => {
    const files = data.images as any[];
    if (files.length > 0) {
      for (let image of files) {
        if (image.size > 6291456) {
          alert("upload image cannot be larger than 6MB");
          return;
        }
      }
    }
  });

  return { control, onSubmit };
}
