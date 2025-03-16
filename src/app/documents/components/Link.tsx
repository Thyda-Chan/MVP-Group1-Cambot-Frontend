import React, { useEffect, useState } from "react";

interface PopupLinkProps {
  fileURL: string;
  children: React.ReactNode;
}

export default function Link({ fileURL, children }: PopupLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-background")) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      <a
        href={fileURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm truncate w-40 text-start underline"
        onClick={handleLinkClick}
      >
        {children}
      </a>

      {isOpen && (
        <div
          className="modal-background fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleClickOutside}
          style={{ zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded-md w-3/4 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={fileURL}
              className="w-full h-full"
              title="Document Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
