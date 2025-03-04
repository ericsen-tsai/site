"use client";

import { Button, DatePicker, Input, Textarea } from "@erichandsen/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { UploadButton } from "./uploadthing";

const diaryFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  location: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  imageUrl: z.string().optional(),
  date: z.date()
});

type DiaryFormData = z.infer<typeof diaryFormSchema>;

type LocationStatus = "loading" | "success" | "error";

export function DiaryForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("loading");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      date: new Date()
    }
  });

  const onSubmit = useCallback((data: DiaryFormData) => {
    const formData = {
      ...data,
      date: data.date
    };

    console.log(formData);
  }, []);

  const renderLocationStatusDescription = useMemo(() => {
    switch (locationStatus) {
      case "loading": {
        return "Getting your location...";
      }
      case "success": {
        return "Location captured ✓";
      }
      case "error": {
        return "Error getting location";
      }
    }
  }, [locationStatus]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // eslint-disable-next-line sonarjs/no-intrusive-permissions -- This is a necessary permission for the diary app
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus("success");

          setValue("location", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus("error");
        }
      );
    }
  }, [setValue]);

  return (
    <div className="rounded-lg p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="text-accent mb-4 block text-sm font-medium">
              Title
            </label>
            <Input type="text" id="title" {...register("title")} placeholder="My Diary Entry" />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="date" className="text-accent mb-4 block text-sm font-medium">
              Date
            </label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker selected={field.value} onSelect={field.onChange} />
              )}
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="text-accent mb-4 block text-sm font-medium">
            Content
          </label>
          <Textarea
            id="content"
            rows={6}
            {...register("content")}
            placeholder="Write your diary entry here..."
          />
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
        </div>

        <div>
          <label htmlFor="image-upload" className="text-accent mb-4 block text-sm font-medium">
            Image Upload
          </label>
          <div id="image-upload" className="mt-1">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const uploadedImageUrl = res[0]?.ufsUrl;
                if (uploadedImageUrl) {
                  setImageUrl(uploadedImageUrl);
                  setValue("imageUrl", uploadedImageUrl);
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Upload error:", error);
              }}
              disabled={isSubmitting}
              className="ut-button:!bg-primary ut-button:text-primary-foreground ut-button:hover:!bg-primary/90 ut-button:shadow"
            />
            {imageUrl && (
              <div className="mt-4">
                <h4 className="text-accent text-sm font-medium">Preview:</h4>
                <div className="mt-2 overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt="Uploaded preview"
                    className="h-48 w-full object-cover md:h-64"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-accent mb-2 text-sm">
          Location status: <span className="font-bold">{renderLocationStatusDescription}</span>
        </p>
        <div className="mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating entry..." : "Create Diary Entry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
