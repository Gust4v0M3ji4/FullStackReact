import { useState } from "react";
import EditUserModal from "./EditUserModal";
import type { UserType } from "@/types/user";

type Props = {
  user: UserType;
};

const User = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center text-center gap-4 mt-[2rem] p-6 dark:bg-zinc-900 rounded-lg">
      <img
        className="w-32 h-32 rounded-full object-cover border-4 border-violet-500 shadow-lg"
        src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThoowpLMiqpKbqfpW3sPWudVzvdtXZV1R2vA&s"}
        alt="User Avatar"
      />

      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Welcome <span className="text-violet-600 font-bold">{user.name}</span>
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300">
          This is your Walletfy app you can work here to see your economics
        </p>
        <p className="text-md text-gray-600 dark:text-gray-300">
          Age: {user.age}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-300">
          Occupation: {user.occupation}
        </p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 px-4 py-2 bg-violet-600 text-white rounded-md shadow-md hover:bg-violet-700 transition"
      >
        Edit Profile
      </button>

      {isModalOpen && <EditUserModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default User;
