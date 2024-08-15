import React from "react";
import { ReactTyped } from "react-typed";

interface TextTypedProps {
  textLists: string[];
}

export default function TextTyped({ textLists }: TextTypedProps) {
  return <ReactTyped strings={textLists} typeSpeed={80} />;
}
