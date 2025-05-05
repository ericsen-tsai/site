"use client";

import type { DiaryEntry } from "@erichandsen/dal";
import { Button, Checkbox, DatePicker, Input, Textarea } from "@erichandsen/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@/trpc/react";

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

export function DiaryForm({ diary }: { diary?: DiaryEntry }) {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("loading");
  const { mutate: createDiaryEntry, isPending: isCreating } = api.diaries.create.useMutation();
  const { mutate: updateDiaryEntry, isPending: isUpdating } = api.diaries.update.useMutation();
  const [preserveLocation, setPreserveLocation] = useState(true);
  const isUpdate = !!diary;

  const formDefaultValues = useMemo(() => {
    return {
      title: diary?.title ?? "",
      content: diary?.content ?? "",
      location:
        diary?.latitude && diary.longitude
          ? {
              latitude: Number(diary.latitude),
              longitude: Number(diary.longitude)
            }
          : undefined,
      date: diary?.date ? new Date(diary.date) : new Date(),
      imageUrl: diary?.heroImageUrl ?? ""
    };
  }, [diary]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors, isDirty }
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: formDefaultValues
  });
  const router = useRouter();

  const onUpdate = useCallback(
    (data: DiaryFormData, handleSuccess: (id: number) => void) => {
      const latitude = preserveLocation ? diary?.latitude : data.location.latitude.toString();
      const longitude = preserveLocation ? diary?.longitude : data.location.longitude.toString();
      updateDiaryEntry(
        {
          ...data,
          latitude: latitude ?? "",
          longitude: longitude ?? "",
          id: diary?.id ?? 0,
          heroImageUrl: data.imageUrl,
          date: data.date
        },
        {
          onSuccess: () => {
            handleSuccess(0);
          }
        }
      );
    },
    [updateDiaryEntry, diary?.id, preserveLocation, diary?.latitude, diary?.longitude]
  );

  const onCreate = useCallback(
    (data: DiaryFormData, handleSuccess: (id: number) => void) => {
      createDiaryEntry(
        {
          ...data,
          latitude: data.location.latitude.toString(),
          longitude: data.location.longitude.toString(),
          heroImageUrl: data.imageUrl,
          date: data.date
        },
        {
          onSuccess: (result) => {
            handleSuccess(result?.id ?? 0);
          }
        }
      );
    },
    [createDiaryEntry]
  );

  const utils = api.useUtils();

  const onSubmit = useCallback(
    (data: DiaryFormData) => {
      const formData = {
        ...data,
        date: data.date
      };

      const mutation = isUpdate ? onUpdate : onCreate;
      const handleSuccess = isUpdate
        ? () => {
            toast.success("Diary entry updated successfully");
            utils.diaries.getAll.invalidate();
            utils.diaries.getById.invalidate({ id: diary.id });
            router.refresh();
          }
        : (id: number) => {
            toast.success("Diary entry created successfully");
            router.push(`/diary/${id}`);
            router.refresh();
          };

      mutation(formData, handleSuccess);
    },
    [isUpdate, onUpdate, onCreate, router, diary?.id, utils]
  );

  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues, reset]);

  const renderLocationStatusDescription = useMemo(() => {
    switch (locationStatus) {
      case "loading": {
        return "...";
      }
      case "success": {
        return "✓";
      }
      case "error": {
        return "x";
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

  const imageUrl = watch("imageUrl");
  const isSubmitting = isCreating || isUpdating;

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
            rows={15}
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
              onBeforeUploadBegin={async (files) => {
                const heic2any = (await import("heic2any")).default;
                const convertedFiles = await Promise.all(
                  files.map(async (file) => {
                    if (file.type === "image/heic" || file.name.endsWith(".heic")) {
                      try {
                        const blobOrBlobs = await heic2any({ blob: file, toType: "image/jpeg" });
                        const blob = Array.isArray(blobOrBlobs) ? blobOrBlobs[0] : blobOrBlobs;
                        if (!blob) {
                          throw new Error("Failed to convert HEIC to PNG");
                        }
                        const newFile = new File([blob], file.name.replace(/\.heic$/i, ".jpeg"), {
                          type: "image/jpeg"
                        });
                        return newFile;
                      } catch (error) {
                        console.error("HEIC to PNG conversion failed", error);
                        return file;
                      }
                    }
                    return file;
                  })
                );
                return convertedFiles;
              }}
              onClientUploadComplete={(res) => {
                const uploadedImageUrl = res[0]?.ufsUrl;
                if (uploadedImageUrl) {
                  setValue("imageUrl", uploadedImageUrl, {
                    shouldDirty: true
                  });
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Upload error:", error);
              }}
              disabled={isSubmitting}
              appearance={{
                button:
                  "!bg-primary !text-primary-foreground hover:!bg-primary/90 ut-uploading:!bg-primary/90 after:!bg-primary !py-2 !px-4 !text-sm !h-auto !w-auto !font-medium"
              }}
            />
            {imageUrl && (
              <div className="mt-4">
                <h4 className="text-accent text-sm font-medium">Preview:</h4>
                <div className="mt-2 overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt="Uploaded preview"
                    className="h-48 w-full object-cover md:h-64"
                    width={1024}
                    height={1024}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center justify-between gap-2 md:!flex-row md:!items-start">
            <div className="text-accent flex flex-col gap-2 text-sm">
              <p>
                Location status:{" "}
                <span className="mr-3 font-bold">{renderLocationStatusDescription}</span>
              </p>
              {isUpdate && (
                <p className="flex items-center gap-2">
                  Preserve location?
                  <Checkbox
                    checked={preserveLocation}
                    onCheckedChange={(checked) => {
                      setPreserveLocation(!!checked);
                    }}
                  />
                </p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? "Saving entry..." : "Save Diary Entry"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
