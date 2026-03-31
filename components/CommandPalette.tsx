"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { searchableItems, type SearchableItem } from "@/lib/data";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (item: SearchableItem) => void;
}

const SHORTCUT_MAP: Record<string, string> = {
  "nav-home": "H",
  "nav-experience": "E",
  "nav-projects": "P",
  "nav-writing": "W",
  "nav-resume": "R",
  "nav-stack": "S",
  "link-x": "X",
  "link-linkedin": "L",
  "link-github": "G",
  "link-email": "M",
};

export function CommandPalette({
  open,
  onClose,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? searchableItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems;

  const navItems = filtered.filter((i) => i.category === "navigation");
  const linkItems = filtered.filter((i) => i.category === "links");
  const allFiltered = [...navItems, ...linkItems];

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback(
    (item: SearchableItem) => {
      if (item.href) {
        window.open(item.href, "_blank", "noopener");
      } else {
        onNavigate(item);
      }
      onClose();
    },
    [onNavigate, onClose]
  );

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, allFiltered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && allFiltered[selectedIndex]) {
        handleSelect(allFiltered[selectedIndex]);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, selectedIndex, allFiltered, handleSelect]);

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-surface-container-highest border border-outline-variant/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with current page indicator */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-lg">
            home
          </span>
          <div>
            <div className="text-on-surface font-headline text-sm font-bold">
              Home
            </div>
            <div className="text-on-surface-variant text-xs">
              About me and what I&apos;m up to
            </div>
          </div>
        </div>

        {/* Search input */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 border border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-on-surface-variant/50 font-body"
              placeholder="Search for actions..."
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto custom-scrollbar px-2 pb-2">
          {navItems.length > 0 && (
            <div className="mb-1">
              <div className="px-3 py-2 text-[11px] font-label uppercase tracking-widest text-on-surface-variant font-bold">
                Navigation
              </div>
              {navItems.map((item) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors duration-100 ${
                      selectedIndex === idx
                        ? "bg-surface-container-high text-on-surface"
                        : "text-on-surface-variant hover:bg-surface-container-high/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-sm">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {SHORTCUT_MAP[item.id] && (
                      <span className="font-label text-[10px] text-on-surface-variant/60 bg-surface-container-low px-1.5 py-0.5 rounded-sm">
                        {SHORTCUT_MAP[item.id]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {linkItems.length > 0 && (
            <div className="mb-1">
              <div className="px-3 py-2 text-[11px] font-label uppercase tracking-widest text-on-surface-variant font-bold">
                Links
              </div>
              {linkItems.map((item) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors duration-100 ${
                      selectedIndex === idx
                        ? "bg-surface-container-high text-on-surface"
                        : "text-on-surface-variant hover:bg-surface-container-high/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-sm">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {SHORTCUT_MAP[item.id] && (
                      <span className="font-label text-[10px] text-on-surface-variant/60 bg-surface-container-low px-1.5 py-0.5 rounded-sm">
                        {SHORTCUT_MAP[item.id]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {allFiltered.length === 0 && (
            <div className="px-3 py-8 text-center text-on-surface-variant/50 text-sm">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-outline-variant/10 text-[10px] text-on-surface-variant/50 font-label">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">
              lightbulb
            </span>
            <span>Type</span>
            <kbd className="px-1 py-0.5 bg-surface-container-low rounded-sm text-[9px] mx-0.5">
              ↵
            </kbd>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded-sm text-[9px] mx-0.5">
              esc
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
