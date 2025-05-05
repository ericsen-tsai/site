import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1
    }
  }).onUploadComplete(({ file }) => {
    return { imageUrl: file.ufsUrl };
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
