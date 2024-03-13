import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-lvh grid-cols-[100px_300px_1fr]">{children}</div>
  );
};
