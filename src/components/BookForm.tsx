import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import AppAlertDialog from "./shared/AppAlertDialog";
import type { Book, ImageType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { toast } from "sonner";

interface Props {
  onCloseFormModal: () => void;
  editFormData?: FormValues;
}

interface FormValues {
  title: string;
  author: string;
  rating: number;
  imageType: ImageType;
  image: string | FileList;
}

const BookForm = ({ onCloseFormModal, editFormData }: Props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    defaultValues: editFormData || {
      title: "",
      author: "",
      imageType: "url",
    },
  });
  const { register, control, handleSubmit, formState, watch, setValue } = form;
  const { errors, touchedFields, dirtyFields } = formState;

  const addBook = useMutation({
    mutationFn: (bookData: FormValues) => {
      return apiClient.post<Book>("books", bookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast.success("Added the Book Succesfully ");
      form.reset();
      onCloseFormModal();
    },
    onError: (error) => {
      toast.error("Failed to Add the Book", {
        description: error.message,
      });
    },
  });

  const onSubmit = async (data: FormValues) => {
    let payload: FormValues;
    if (typeof data.image !== "string" && data.image instanceof FileList) {
      const file = data.image[0];
      const base64Image = await fileToBase64(file);
      payload = { ...data, image: base64Image };
    } else {
      payload = data;
    }
    addBook.mutate(payload);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const watchImgType = watch("imageType");
  useEffect(() => {
    if (editFormData) {
      if (touchedFields.image === true && dirtyFields.image === true) setValue("image", "");
    } else {
      setValue("image", "");
    }
  }, [watchImgType, touchedFields, dirtyFields, editFormData, setValue]);

  // Form Modal Close Confirmation Alert functions
  const onCancel = () => {
    if (Object.keys(dirtyFields).length > 0) {
      setIsAlertOpen(true);
    } else {
      onCloseFormModal();
    }
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const handleContinue = () => {
    setIsAlertOpen(false);
    onCloseFormModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full pt-2 pb-6 px-6 rounded-xl space-y-6" noValidate>
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: { value: true, message: "Please Enter a Title" },
              minLength: { value: 3, message: "The title should be at least 3 characters long" },
              validate: (fieldValue) => {
                return fieldValue.trim() !== "" || "Please Enter a valid Title";
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <span className="text-red-600 text-xs">{errors.title?.message}</span>
        </div>

        {/* Author Field */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register("author", { required: { value: true, message: "Please Enter the Author Name" } })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <span className="text-red-600 text-xs">{errors.author?.message}</span>
        </div>

        {/* Rating Field */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            {...register("rating", {
              required: { value: true, message: "Please Provide the Rating" },
              min: { value: 1, message: "Minimum value should be 1" },
              max: { value: 5, message: "Maximum value should be 5" },
              valueAsNumber: true,
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          <span className="text-red-600 text-xs">{errors.rating?.message}</span>
        </div>

        {/* Cover Image Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image Type</label>
          <div className="mt-1 flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="url"
                {...register("imageType", {
                  required: "Please select an option",
                })}
                className="border-gray-300 text-app-primary focus:ring-app-primary h-4 w-4 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">Url</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                value="fileUpload"
                {...register("imageType", {
                  required: "Please select an option",
                })}
                className="border-gray-300 text-app-primary focus:ring-app-primary h-4 w-4 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">File Upload</span>
            </label>
          </div>
          <span className="text-red-600 text-xs">{errors.imageType?.message}</span>
        </div>

        {/* Cover Image File Upload */}
        {watchImgType == "fileUpload" && (
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Book Cover
            </label>
            <input
              className="mt-1 block w-full border border-dashed border-app-secondary-dark text-sm cursor-pointer rounded-md h-[42px] p-2"
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: { value: true, message: "Please Upload a Cover Image" } })}
            />
            <span className="text-red-600 text-xs">{errors.image?.message}</span>
          </div>
        )}

        {/* Cover Image URL*/}
        {watchImgType == "url" && (
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image Url
            </label>
            <input
              type="text"
              id="imageUrl"
              {...register("image", { required: { value: true, message: "Please Enter the Image Url" } })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <span className="text-red-600 text-xs">{errors.image?.message}</span>
          </div>
        )}

        {/* Submit Button and Cancel Button*/}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-app-primary hover:bg-app-primary-dark border border-app-primary text-white py-2 px-4 rounded-md transition cursor-pointer mb-3"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-gray-600 py-2 px-4 rounded-md transition cursor-pointer border border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
      <DevTool control={control} />
      {/* Confirmation Dialog before Canceling the form */}
      <AppAlertDialog
        open={isAlertOpen}
        onCancel={closeAlert}
        title="Discard Changes?"
        message="You have unsaved changes. Close without saving?"
        onContinue={handleContinue}
        cancelText="No"
        continueText="Yes"
      />
    </>
  );
};

export default BookForm;
