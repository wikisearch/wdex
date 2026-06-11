import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

import useDebounce from "@/hooks/useDebounce";

import Input from "./input";
import LanguageIcon from "../language-icon";

type Option = {
  label: string;
  value: string;
};

type MultiSelectDropdownProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  anyLabel?: string;
  onSearch?: (query: string) => Promise<Option[]>;
  language?: boolean;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options = [],
  selectedValues,
  onChange,
  anyLabel = "Tất cả",
  onSearch,
  language = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cachedOptions, setCachedOptions] = useState<Record<string, string>>(
    Object.fromEntries(options.map((option) => [option.value, option.label])),
  );
  const [loading, setLoading] = useState(false);
  const [resultOptions, setResultOptions] = useState<Option[]>(options);
  const [query, setQuery] = useState("");
  const deboucedQuery = useDebounce(query, 1000);

  // Handle click outside to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!onSearch) return;
    if (!deboucedQuery) {
      setLoading(false);
      setResultOptions(options);
      return;
    }
    if (deboucedQuery) {
      setLoading(true);
      setResultOptions(options);
      onSearch(deboucedQuery)
        .then((data) => {
          setResultOptions(data);
        })
        .finally(() => setLoading(false));
    }
  }, [deboucedQuery, onSearch]);

  const handleCheckboxChange = (option: Option) => {
    const value = option.value;
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
    setCachedOptions((_options) => ({
      ..._options,
      [option.value]: option.label,
    }));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-border/30 bg-background p-2.5 text-left text-sm text-foreground shadow-soft transition-all duration-200 hover:border-accent/30 focus:border-accent/50 focus:shadow-soft-md focus:ring-2 focus:ring-accent/20"
      >
        <span className="line-clamp-1">
          {selectedValues.length > 0 ? (
            language ? (
              <div className="flex w-full gap-2 overflow-hidden">
                {selectedValues.map((v) => (
                  <div className="h-[21px]" key={v}>
                    <LanguageIcon languageCode={v} width="100%" height="100%" />
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-foreground">
                {selectedValues.map((v) => cachedOptions[v] || "").join(", ")}
              </span>
            )
          ) : (
            <span className="text-muted-foreground/60">{anyLabel}</span>
          )}
        </span>
        <svg
          className={`h-4 w-4 text-muted-foreground/50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border/10 bg-background/95 shadow-soft-lg backdrop-blur-xl">
          <div className="max-h-60 overflow-y-auto p-2">
            {onSearch && (
              <div className="px-1 pb-2">
                <Input
                  type="search"
                  placeholder="Tìm kiếm..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  icon={<FaSearch />}
                />
              </div>
            )}
            {onSearch && selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                {selectedValues.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-1 rounded-lg bg-accent/15 px-2 py-1 text-xs font-medium text-accent"
                  >
                    <div className="max-w-40 truncate">
                      {cachedOptions[value]}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onChange(selectedValues.filter((v) => v !== value))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {loading && (
              <div className="py-4 text-center text-sm text-muted-foreground">
                Đang tìm kiếm...
              </div>
            )}
            <ul aria-labelledby="states-button">
              {resultOptions.map((option) => {
                const active = selectedValues.includes(option.value);
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="inline-flex w-full rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent/5"
                      onClick={() => handleCheckboxChange(option)}
                    >
                      <div className="inline-flex cursor-pointer items-center gap-2 md:gap-3">
                        <div
                          className={twMerge(
                            "h-4 w-4 rounded-full border-2 transition-colors",
                            active
                              ? "border-accent bg-accent"
                              : "border-muted-foreground/30",
                          )}
                        />
                        <div
                          className={twMerge(
                            "line-clamp-1 text-left",
                            active
                              ? "font-semibold text-accent"
                              : "text-foreground/70",
                          )}
                        >
                          {option.label}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
              {!loading && resultOptions.length === 0 && (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  Không có kết quả nào
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
