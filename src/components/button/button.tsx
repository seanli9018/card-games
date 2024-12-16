import { ButtonProps } from "./button.type";

export default function Button({
  children,
}: // variant = "primary"
ButtonProps) {
  return (
    <button className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
      {children}
    </button>
  );
}
