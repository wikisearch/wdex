import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type ReadMoreProps = {
  children: ReactNode;
  maxHeight?: number;
};

const ReadMore: React.FC<ReadMoreProps> = ({ children, maxHeight = 150 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children, maxHeight]);

  return (
    <div
      className="relative overflow-hidden transition-all duration-500"
      style={{ maxHeight: expanded ? "none" : maxHeight }}
    >
      <div
        ref={contentRef}
        className={`relative overflow-hidden transition-all duration-500`}
        style={{ maxHeight: expanded ? "none" : maxHeight }}
      >
        {children}
        {!expanded && isOverflowing && (
          <div
            className="absolute bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-background to-transparent pb-1"
            style={{ height: `${maxHeight / 2}px` }}
          >
            <div className="flex items-center justify-center gap-2">
              <button
                className="flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent/80 focus:outline-none"
                onClick={() => setExpanded(true)}
              >
                <ChevronDown className="h-3 w-3" />
                HIỆN THÊM
              </button>
            </div>
          </div>
        )}
      </div>
      {isOverflowing && (
        <div className="flex items-baseline justify-center gap-2">
          <button
            className="mt-2 flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent/80 focus:outline-none"
            onClick={() => setExpanded(false)}
          >
            <ChevronUp className="h-3 w-3" />
            THU GỌN
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
