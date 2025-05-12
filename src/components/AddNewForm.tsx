import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import AppAlertDialog from "./shared/AppAlertDialog";

interface Props {
  onClose: () => void;
}

interface FormValues {
  title: string;
  author: string;
  rating: number;
  image: FileList;
}

const AddNewForm = ({ onClose }: Props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      author: ""
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

  const onSubmit = async (data: FormValues) => {
    const file = data.image[0];
    const base64Image = await fileToBase64(file);
    const payload = { ...data, image: base64Image };
    console.log("Form Submited", payload);
    form.reset();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onCancel = () => {
    if (isDirty) {
      console.log("form is dirty");
      setIsAlertOpen(true);
    } else {
      console.log("not dirty");
      onClose();
    }
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

        {/* Submit Button and Cancel Button*/}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-app-primary hover:bg-app-primary-dark border border-app-primary text-white py-2 px-4 rounded-md transition cursor-pointer mb-3"
          >
            Submit
          </button>
          <button
            type="reset"
            onClick={onCancel}
            className="w-full text-gray-600 py-2 px-4 rounded-md transition cursor-pointer border border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
      <DevTool control={control} />
      <AppAlertDialog
        open={isAlertOpen}
        onCancel={() => setIsAlertOpen(false)}
        title="Add New Book - Discard Changes?"
        message="You have unsaved changes. Close without saving?"
        onClose={onClose}
        cancelText="No"
        continueText="Yes"
      />
    </>
  );
};

export default AddNewForm;
