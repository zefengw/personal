"use client";

import { useState } from "react";
import type { FileItem } from "@/lib/data";

interface SidebarProps {
  fileTree: FileItem[];
  expandedFolders: string[];
  activeFileId: string;
  onToggleFolder: (folderId: string) => void;
  onOpenFile: (file: FileItem) => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
  onOpenAllPages: () => void;
  onCloseAllPages: () => void;
}

export function Sidebar({
  fileTree,
  expandedFolders,
  activeFileId,
  onToggleFolder,
  onOpenFile,
  onCollapseAll,
  onExpandAll,
  onOpenAllPages,
  onCloseAllPages,
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-64 bg-surface border-r border-surface-container-low flex flex-col h-full text-sm leading-relaxed">
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-label tracking-tighter text-on-surface-variant">
          JACK_WANG
        </span>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="material-symbols-outlined text-xs text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors"
          >
            more_horiz
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-6 z-50 bg-surface-container-highest border border-outline-variant/15 py-1 min-w-[180px]">
                <button
                  onClick={() => {
                    onCollapseAll();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    unfold_less
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-wider">
                    Collapse All
                  </span>
                </button>
                <button
                  onClick={() => {
                    onExpandAll();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    unfold_more
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-wider">
                    Expand All
                  </span>
                </button>
                <div className="my-1 border-t border-outline-variant/10" />
                <button
                  onClick={() => {
                    onOpenAllPages();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    tab
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-wider">
                    Open All Pages
                  </span>
                </button>
                <button
                  onClick={() => {
                    onCloseAllPages();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    tab_close
                  </span>
                  <span className="font-label text-[11px] uppercase tracking-wider">
                    Close All Pages
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {fileTree.map((node) =>
          node.type === "folder" ? (
            <FolderNode
              key={node.id}
              node={node}
              expandedFolders={expandedFolders}
              activeFileId={activeFileId}
              onToggleFolder={onToggleFolder}
              onOpenFile={onOpenFile}
            />
          ) : (
            <RootFileNode
              key={node.id}
              node={node}
              activeFileId={activeFileId}
              onOpenFile={onOpenFile}
            />
          ),
        )}
      </div>
    </div>
  );
}

function RootFileNode({
  node,
  activeFileId,
  onOpenFile,
}: {
  node: FileItem;
  activeFileId: string;
  onOpenFile: (file: FileItem) => void;
}) {
  return (
    <button
      onClick={() => onOpenFile(node)}
      className={`w-full flex items-center px-4 py-1 transition-colors duration-150 cursor-pointer mt-0.5 ${
        node.id === activeFileId
          ? "text-on-surface bg-surface-container-low/60 border-l-2 border-tertiary"
          : "text-on-surface-variant hover:bg-surface-container-low/50 border-l-2 border-transparent"
      }`}
    >
      <span
        className={`material-symbols-outlined text-sm mr-2 ${node.iconColor || ""}`}
      >
        {node.icon}
      </span>
      <span>{node.name}</span>
    </button>
  );
}

function FolderNode({
  node,
  expandedFolders,
  activeFileId,
  onToggleFolder,
  onOpenFile,
}: {
  node: FileItem;
  expandedFolders: string[];
  activeFileId: string;
  onToggleFolder: (id: string) => void;
  onOpenFile: (file: FileItem) => void;
}) {
  const isExpanded = expandedFolders.includes(node.id);
  const hasActiveChild = node.children?.some((c) => c.id === activeFileId);

  return (
    <div className="group mt-0.5">
      <button
        onClick={() => onToggleFolder(node.id)}
        className={`w-full flex items-center px-4 py-1 transition-colors duration-150 ${
          isExpanded && hasActiveChild
            ? "bg-surface-container-low text-primary border-l-2 border-tertiary"
            : "text-on-surface-variant hover:bg-surface-container-low/50 border-l-2 border-transparent"
        }`}
      >
        <span className="material-symbols-outlined text-sm mr-2">
          {isExpanded ? "expand_more" : "chevron_right"}
        </span>
        <span className={isExpanded && hasActiveChild ? "font-bold" : ""}>
          {node.name}
        </span>
      </button>

      {isExpanded && node.children && (
        <div className="pl-8 py-1 space-y-0.5">
          {node.children.map((child) => (
            <button
              key={child.id}
              onClick={() => onOpenFile(child)}
              className={`w-full flex items-center py-1 pr-4 transition-colors duration-150 cursor-pointer ${
                child.id === activeFileId
                  ? "text-on-surface bg-surface-container-low/60"
                  : "text-on-surface-variant hover:bg-surface-container-low/50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-sm mr-2 ${child.iconColor || ""}`}
              >
                {child.icon}
              </span>
              <span>{child.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
