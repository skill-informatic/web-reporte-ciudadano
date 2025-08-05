"use client";

import React from "react";

type TextInputComponentProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaComponent: React.FC<TextInputComponentProps> = (props) => {
  return (
    <textarea
      {...props}
      rows={6}
      style={{
        width: "100%",
        padding: ".5rem .1rem",
        backgroundColor: "#EDEDED",
        border: "1px solid transparent",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        outline: "none",
        transition: "border 0.2s ease-in-out",
        resize: "vertical", // para que puedas redimensionar solo verticalmente si quieres
      }}
      required
      onFocus={(e) => (e.currentTarget.style.border = "1px solid #8B5CF6")}
      onBlur={(e) => (e.currentTarget.style.border = "1px solid transparent")}
      onMouseEnter={(e) => {
        if (document.activeElement !== e.currentTarget) {
          e.currentTarget.style.border = "1px solid #8B5CF6";
        }
      }}
      onMouseLeave={(e) => {
        if (document.activeElement !== e.currentTarget) {
          e.currentTarget.style.border = "1px solid transparent";
        }
      }}
    />
  );
};

export default TextareaComponent;
