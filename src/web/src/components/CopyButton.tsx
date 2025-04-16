import React, { useState, useRef } from "react";

const CopyButton: React.FC<{ date: string; title: string; quote: string; author: string; citation: string }> = ({
  date,
  title,
  quote,
  author,
  citation,
}) => {
  const [buttonText, setButtonText] = useState("Copy");
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatDate = (dateString: string): string => {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options); // Formats as "April 16th"
  };

  const handleCopy = () => {
    const formattedDate = formatDate(date);
    const contentToCopy = `${formattedDate}\n\n${title}\n\n${quote}\n\n- ${author} - ${citation}`;

    navigator.clipboard.writeText(contentToCopy).then(() => {
      setButtonText("Copied!");
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setButtonText("Copy");
        copyTimeoutRef.current = null;
      }, 5000);
    });
  };

  return <button className="copy-button" onClick={handleCopy}>{buttonText}</button>;
};

export default CopyButton;
