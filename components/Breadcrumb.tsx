"use client";

import React, { ReactNode, FC } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb: FC<TBreadCrumbProps> = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}) => {
  const paths = usePathname();
  const PrePathNames = paths.split("/").filter((path) => path);
  const pathNames = PrePathNames.map((path) => {
    const underscoreIndex = path.indexOf("_");
    if (underscoreIndex !== -1) {
      return decodeURIComponent(path.substring(underscoreIndex + 1));
    } else {
      return path;
    }
  });

  console.log(pathNames);

  return (
    <div className="fixed top-[50px] z-30 backdrop-blur-xl back">
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link
            href={"/"}
            className={
              paths === '/'
                ? `${activeClasses}`
                : ''
            }
          >
            {homeElement}
          </Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            link === pathNames[pathNames.length - 1] ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
