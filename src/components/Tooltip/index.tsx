import React from "react";

type Props = {
  open: boolean;
  children: React.ReactNode;
};
const Tooltip = ({ open, children }: Props) => {
  if (!open) return null;
  return (
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
      {children}
    </div>
  );
};

export default Tooltip;
