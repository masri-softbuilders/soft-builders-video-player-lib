import React from "react";

type Props = {
  open: boolean;
  children: React.ReactNode;
};
const Tooltip = ({ open, children }: Props) => {
  if (!open) return null;
  return (
    <div className="sb-absolute sb-bottom-full sb-mb-2 sb-left-1/2 sb-transform sb--translate-x-1/2 sb-z-10 sb-whitespace-nowrap">
      {children}
    </div>
  );
};

export default Tooltip;
