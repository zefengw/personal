"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TabBar } from "@/components/TabBar";
import { CommandPalette } from "@/components/CommandPalette";
import { AboutContent } from "@/components/content/AboutContent";
import { ExperienceContent } from "@/components/content/ExperienceContent";
import { StackContent } from "@/components/content/StackContent";
import { ProjectsContent } from "@/components/content/ProjectsContent";
import { WritingContent } from "@/components/content/WritingContent";
import { ResumeContent } from "@/components/content/ResumeContent";
import {
  fileTree,
  findFileById,
  findParentFolder,
  getAllFolderIds,
  getAllFiles,
  type FileItem,
  type Tab,
  type SearchableItem,
} from "@/lib/data";

const CONTENT_MAP: Record<
  string,
  React.ComponentType<{ onNavigate?: (fileId: string) => void }>
> = {
  about: AboutContent,
  experience: ExperienceContent,
  "stack-config": StackContent,
  "featured-projects": ProjectsContent,
  articles: WritingContent,
  resume: ResumeContent,
};

const DEFAULT_TAB: Tab = {
  id: "about",
  name: "README.md",
  icon: "person",
  iconColor: "text-tertiary",
  section: "about",
};

export default function Home() {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "about-folder",
  ]);
  const [openTabs, setOpenTabs] = useState<Tab[]>([DEFAULT_TAB]);
  const [activeTabId, setActiveTabId] = useState("about");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [isMac, setIsMac] = useState(true);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Detect platform for shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  // Hydrate theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Auto-hide sidebar on small screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) setSidebarVisible(false);
    const handler = (e: MediaQueryListEvent) => setSidebarVisible(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Track real-time cursor position + move cursor highlight dot
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      // Move dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
      const mainEl = document.getElementById("editor-content");
      if (!mainEl) return;
      const rect = mainEl.getBoundingClientRect();
      const relX = Math.max(0, Math.round(e.clientX - rect.left));
      const relY = Math.max(0, Math.round(e.clientY - rect.top));
      const line = Math.max(1, Math.ceil(relY / 20));
      const col = Math.max(1, Math.ceil(relX / 8));
      setCursorPos({ line, col });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId],
    );
  }, []);

  const navigateToFile = useCallback((fileId: string) => {
    const file = findFileById(fileId);
    if (!file) return;

    const parentId = findParentFolder(fileId);
    if (parentId) {
      setExpandedFolders((prev) =>
        prev.includes(parentId) ? prev : [...prev, parentId],
      );
    }

    setOpenTabs((prev) => {
      if (prev.some((tab) => tab.id === file.id)) return prev;
      return [
        ...prev,
        {
          id: file.id,
          name: file.name,
          icon: file.icon,
          iconColor: file.iconColor || "",
          section: file.section,
        },
      ];
    });
    setActiveTabId(file.id);
  }, []);

  const openFile = useCallback(
    (file: FileItem) => {
      navigateToFile(file.id);
    },
    [navigateToFile],
  );

  const closeTab = useCallback(
    (tabId: string) => {
      setOpenTabs((prev) => {
        const newTabs = prev.filter((tab) => tab.id !== tabId);
        if (activeTabId === tabId && newTabs.length > 0) {
          const closedIndex = prev.findIndex((tab) => tab.id === tabId);
          const newActive = newTabs[Math.min(closedIndex, newTabs.length - 1)];
          setActiveTabId(newActive.id);
        } else if (newTabs.length === 0) {
          setActiveTabId("");
        }
        return newTabs;
      });
    },
    [activeTabId],
  );

  const handleCommandNavigate = useCallback(
    (item: SearchableItem) => {
      if (item.fileId) {
        navigateToFile(item.fileId);
        if (item.folderId) {
          setExpandedFolders((prev) =>
            prev.includes(item.folderId!) ? prev : [...prev, item.folderId!],
          );
        }
      }
    },
    [navigateToFile],
  );

  const collapseAll = useCallback(() => {
    setExpandedFolders([]);
  }, []);

  const expandAll = useCallback(() => {
    setExpandedFolders(getAllFolderIds());
  }, []);

  const openAllPages = useCallback(() => {
    const allFiles = getAllFiles();
    setExpandedFolders(getAllFolderIds());
    setOpenTabs((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const newTabs = allFiles
        .filter((f) => !existingIds.has(f.id))
        .map((f) => ({
          id: f.id,
          name: f.name,
          icon: f.icon,
          iconColor: f.iconColor || "",
          section: f.section,
        }));
      return [...prev, ...newTabs];
    });
    setActiveTabId("about");
  }, []);

  const closeAllPages = useCallback(() => {
    setOpenTabs([]);
    setActiveTabId("");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const ActiveContent = activeTabId ? CONTENT_MAP[activeTabId] : null;
  const shortcutKey = isMac ? "⌘" : "Ctrl+";

  const sharedSidebarProps = {
    fileTree,
    expandedFolders,
    activeFileId: activeTabId,
    onToggleFolder: toggleFolder,
    onCollapseAll: collapseAll,
    onExpandAll: expandAll,
    onOpenAllPages: openAllPages,
    onCloseAllPages: closeAllPages,
  };

  return (
    <div className="flex h-screen w-full" style={{ height: "100dvh" }}>
      {/* Cursor highlight dot */}
      <div ref={cursorDotRef} id="cursor-highlight" />

      {/* Sidebar: Activity Bar + Explorer */}
      <aside className="flex h-full sticky top-0 left-0 shrink-0">
        {/* Activity Bar */}
        <nav className="w-12 bg-surface-container-lowest border-r border-surface-container-low flex flex-col items-center py-4 space-y-4">
          <div className="p-2 text-primary">
            <span className="material-symbols-outlined">terminal</span>
          </div>
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className={`p-2 transition-colors duration-150 ${
              sidebarVisible
                ? "text-primary border-l-2 border-tertiary bg-surface-container-low"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={
                sidebarVisible
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              folder
            </span>
          </button>
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title={`Search (${shortcutKey}K)`}
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          <div className="flex-1" />

          {/* Avatar / About button */}
          <button
            onClick={() => navigateToFile("about")}
            className={`p-2 transition-colors duration-150 ${
              activeTabId === "about"
                ? "text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
            title="About Me"
          >
            <span className="material-symbols-outlined">person</span>
          </button>

          {/* Theme toggle (single click) */}
          <div className="pb-8">
            <button
              onClick={toggleTheme}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              <span className="material-symbols-outlined">
                {theme === "dark" ? "dark_mode" : "light_mode"}
              </span>
            </button>
          </div>
        </nav>

        {/* Explorer Panel - hidden on mobile when collapsed */}
        {sidebarVisible && (
          <div className="hidden md:block">
            <Sidebar
              {...sharedSidebarProps}
              onOpenFile={openFile}
            />
          </div>
        )}
      </aside>

      {/* Mobile sidebar overlay — outside aside to escape sticky stacking context */}
      {sidebarVisible && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-background/60"
            onClick={() => setSidebarVisible(false)}
          />
          <div className="relative z-10 ml-12 h-full">
            <Sidebar
              {...sharedSidebarProps}
              onOpenFile={(file) => {
                openFile(file);
                setSidebarVisible(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-surface overflow-hidden">
        <TabBar
          tabs={openTabs}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
          onCloseTab={closeTab}
        />

        <div
          id="editor-content"
          className="flex-1 overflow-y-auto custom-scrollbar pb-12"
        >
          {ActiveContent ? (
            <ActiveContent onNavigate={navigateToFile} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-6 px-4">
                <span className="material-symbols-outlined text-6xl text-outline-variant/30">
                  code
                </span>
                <p className="font-label text-sm text-on-surface-variant/50 uppercase tracking-widest">
                  Select a file to begin
                </p>
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    search
                  </span>
                  <span className="font-label text-xs">
                    Search for actions...
                  </span>
                  <kbd className="ml-4 font-label text-[10px] text-on-surface-variant/60 bg-surface-container-low px-1.5 py-0.5 rounded-sm">
                    {shortcutKey}K
                  </kbd>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Status Bar */}
      <footer className="fixed bottom-0 w-full h-6 bg-primary-container text-on-primary-container font-label text-[10px] uppercase flex justify-between px-3 items-center z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 px-2 h-full">
            <span className="material-symbols-outlined text-[12px]">
              account_tree
            </span>
            <span>building...</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 px-2 h-full">
            <span>
              Ln {cursorPos.line}, Col {cursorPos.col}
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 px-2 h-full">
            <span>UTF-8</span>
          </div>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleCommandNavigate}
      />
    </div>
  );
}
