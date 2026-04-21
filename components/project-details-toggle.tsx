"use client";

import { useState } from "react";

type ProjectDetailsToggleProps = {
  longDescription: string;
};

export function ProjectDetailsToggle({ longDescription }: ProjectDetailsToggleProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="relative inline-block h-5 w-[8rem] whitespace-nowrap text-left font-sans text-sm leading-5"
      >
        <span className="invisible">More details</span>
        <span
          className={`absolute left-0 top-0 transition-colors duration-300 ${
            open ? "text-transparent" : "text-body"
          }`}
        >
          More details
        </span>
        <span
          className={`absolute left-0 top-0 transition-colors duration-300 ${
            open ? "text-body" : "text-transparent"
          }`}
        >
          Less details
        </span>
      </button>
      <p
        className={`overflow-hidden text-sm leading-relaxed text-body transition-all duration-500 ${
          open ? "mt-2 max-h-96 opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        {longDescription}
      </p>
    </div>
  );
}
