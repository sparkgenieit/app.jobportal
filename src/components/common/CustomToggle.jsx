// src/components/common/CustomToggle.jsx
"use client";

import React from "react";
import { useAccordionButton } from "react-bootstrap";

export default function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      onClick={decoratedOnClick}
      className="cursor-pointer py-2 px-3 hover:bg-gray-100 rounded-md font-medium"
    >
      {children}
    </div>
  );
}
