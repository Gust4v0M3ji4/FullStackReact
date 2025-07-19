import { ThemeToggleButton } from "./ChangeThemeButton";

export default function Header() {
  return (
    <header className="p-4  bg-gray-100 dark:bg-gray-800  flex justify-between  shadow-md items-center border-b border-gray-300 dark:border-gray-700 border-solid box-border-gray-300 ">
      <a href="/" className="text-2xl font-bold text-black dark:text-white">
        Wallet
        <span className="text-violet-500 dark:text-violet-400">fy</span> 2
      </a>
      <ThemeToggleButton />
    </header>
  );
}
