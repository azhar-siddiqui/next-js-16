"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";

type TruncateStringProps = {
  className?: string;
  text: string;
  maxLength?: number;
};

const TruncateString: React.FC<TruncateStringProps> = ({
  className,
  text,
  maxLength = 100,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded((prev) => !prev);

  // Step 1: Extract condition
  const shouldTruncate: boolean = text.length > maxLength;

  // Step 2: Extract displayedText logic into clear if/else
  let displayedText: string;
  if (isExpanded) {
    displayedText = text;
  } else {
    displayedText = shouldTruncate ? text.slice(0, maxLength) + "..." : text;
  }

  return (
    <div>
      <span className={cn("text-sm pr-2", className)}>{displayedText}</span>
      {shouldTruncate && (
        <Button
          variant="link"
          onClick={toggleDescription}
          className="hover:no-underline font-medium cursor-pointer h-2 p-0 text-muted-foreground"
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
};

export default TruncateString;
