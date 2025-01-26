import { Fragment, isValidElement } from 'react';
import DropdownContainer from '../dropdownContainer';
import {
  LinkGroupType,
  LinkListDropdownProps,
  LinkItem,
} from './linkListDropdown.type';

function LinkGroup({ linkGroup }: { linkGroup: LinkGroupType }) {
  const linkGroupElements = linkGroup.map((item, index) => {
    return (
      <li key={`linkGroup-${index}`} className="m-1 rounded-xl text-sm">
        {!isValidElement(item) && (item as LinkItem).href ? (
          <a
            href={(item as LinkItem).href}
            className="block px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600"
          >
            {(item as LinkItem).label}
          </a>
        ) : isValidElement(item) ? (
          <>{item}</>
        ) : null}
      </li>
    );
  });

  return <>{linkGroupElements}</>;
}
export default function LinkListDropdown({
  open,
  title,
  linkGroups,
  children,
  position = 'center',
  onClose,
}: LinkListDropdownProps) {
  const linkSections = linkGroups.map((linkGroup, index) => {
    return (
      <Fragment key={`linkGroups-${index}`}>
        <LinkGroup linkGroup={linkGroup} />
        {index <= linkGroup.length ? (
          <div aria-hidden className="bg-slate-400 h-px"></div>
        ) : null}
      </Fragment>
    );
  });

  return (
    <DropdownContainer
      open={open}
      position={position}
      content={
        <>
          {title ? (
            <h2 className="text-md px-2 font-semibold">{title}</h2>
          ) : null}
          <ul>{linkSections}</ul>
        </>
      }
      onClose={onClose}
    >
      {children}
    </DropdownContainer>
  );
}
