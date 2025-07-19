import { useState } from "react";

type Props = {
  onCalculate: (value: number) => void;
};

export const InitialBalanceInput = ({ onCalculate }: Props) => {
  const [value, setValue] = useState<number>(0);

  const handleClick = () => {
    onCalculate(value);
  };

  return (
    <div className="flex items-end">
      <div>
        <label className="block bfgtext-sm font-medium text-gray-700 dark:text-gray-200">
          Dinero inicial
        </label>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className=" bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm dark:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700"
        />
      </div>
      <button
        onClick={handleClick}
        className="ml-4 py-[0.5rem] px-[1rem] bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600"
      >
        Calcular
      </button>
    </div>
  );
};
