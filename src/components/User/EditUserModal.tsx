// src/components/EditUserModal.tsx
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

type Props = {
  onClose: () => void;
};

const EditUserModal = ({ onClose }: Props) => {
  const { user, editUser } = useUser();

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    age: user?.age ?? 0,
    occupation: user?.occupation ?? "",
    image: user?.image ?? "", // nuevo campo
  });

  // Handler para imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editUser.mutate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600/25  flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-800 p-6 rounded-md w-[90%] max-w-md space-y-4 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          Edit Profile
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-700 dark:text-white"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Age
          </label>
          <input
            type="number"
            name="age"
            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-700 dark:text-white"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-700 dark:text-white"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Image
          </label>
          <div className="flex flex-col items-center">
            <div
              className="cursor-pointer px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-center w-40 mb-2 transition-colors duration-200"
              onClick={() => document.getElementById('profile-image-input')?.click()}
            >
              {formData.image ? 'Change Image' : 'Upload Image'}
            </div>
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto mt-2 border border-gray-300 dark:border-gray-600 shadow"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
