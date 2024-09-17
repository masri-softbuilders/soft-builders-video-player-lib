import React, { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  buttonContent: React.ReactNode;
  menuContent: React.ReactNode;
  close?: (fun: Function) => void;
};

const MenuButton = ({ buttonContent, menuContent, close }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (close) close(closeMenu);
  }, [close, closeMenu]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Open menu"
      >
        {buttonContent}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="Open menu"
          className="absolute shadow-lg right-0 bottom-10"
        >
          {menuContent}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
