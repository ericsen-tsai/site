"use client";

import type { DiaryEntry } from "@erichandsen/dal";
import { Button, DatePicker, Input, Textarea } from "@erichandsen/ui";
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
  const { mutate: createDiaryEntry } = api.diaries.create.useMutation();
  const { mutate: updateDiaryEntry } = api.diaries.update.useMutation();

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
    formState: { errors, isSubmitting, isDirty }
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: formDefaultValues
  });
  const router = useRouter();

  const onUpdate = useCallback(
    (data: DiaryFormData, handleSuccess: (id: number) => void) => {
      updateDiaryEntry(
        {
          ...data,
          latitude: data.location.latitude.toString(),
          longitude: data.location.longitude.toString(),
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
    [updateDiaryEntry, diary?.id]
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
            reset(formDefaultValues);
          }
        : (id: number) => {
            toast.success("Diary entry created successfully");
            router.push(`/diary/${id}`);
          };

      mutation(formData, handleSuccess);
    },
    [isUpdate, onUpdate, onCreate, router, reset, formDefaultValues, diary?.id, utils]
  );

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

  const imageUrl = watch("imageUrl");

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
            <p className="text-accent mb-2 text-sm">
              Location status: <span className="font-bold">{renderLocationStatusDescription}</span>
            </p>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? "Saving entry..." : "Save Diary Entry"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
