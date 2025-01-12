import type { DropdownProps, LinkGroupType } from "./dropdown.type";

function LinkGroup({ linkGroup }: { linkGroup: LinkGroupType }) {
  const linkGroupElements = linkGroup.map((linkItem, index) => {
    return (
      <>
        <li key={`linkGroup-${index}`} className="m-1 rounded-xl text-sm">
          <a
            href={linkItem.href}
            className="block px-2 py-2 text-gray-700 hover:bg-slate-100 dark:hover:bg-slate-600"
          >
            {linkItem.label}
          </a>
        </li>
        {index !== linkGroup.length - 1 ? (
          <div aria-hidden className="bg-slate-400 h-px"></div>
        ) : null}
      </>
    );
  });

  return <>{linkGroupElements}</>;
}

export default function Dropdown({
  open = false,
  user,
  linkGroups,
}: DropdownProps) {
  if (!open || !user) return null;

  const linkSections = linkGroups.map((linkGroup, index) => {
    return <LinkGroup key={`linkGroups-${index}`} linkGroup={linkGroup} />;
  });

  return (
    <div className="absolute right-2 mt-6 p-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <h2 className="text-md px-2 font-semibold">{`Hi, ${user.username}`}</h2>
      <ul>
        {linkSections}
        <li>
          <button
            onClick={() => alert("Logged out!")}
            className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
