export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  icon: string;
  iconColor?: string;
  section: string;
  children?: FileItem[];
}

export interface Tab {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  section: string;
}

export interface SearchableItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: "navigation" | "links";
  fileId?: string;
  folderId?: string;
  href?: string;
}

export const fileTree: FileItem[] = [
  {
    id: "about-folder",
    name: "About",
    type: "folder",
    icon: "folder",
    section: "about",
    children: [
      {
        id: "about",
        name: "README.md",
        type: "file",
        icon: "person",
        iconColor: "text-tertiary",
        section: "about",
      },
    ],
  },
  {
    id: "work",
    name: "Work",
    type: "folder",
    icon: "folder",
    section: "work",
    children: [
      {
        id: "experience",
        name: "experience.md",
        type: "file",
        icon: "description",
        iconColor: "text-primary",
        section: "work",
      },
      {
        id: "stack-config",
        name: "stack_config.json",
        type: "file",
        icon: "terminal",
        iconColor: "text-secondary",
        section: "work",
      },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    type: "folder",
    icon: "folder",
    section: "projects",
    children: [
      {
        id: "featured-projects",
        name: "featured.md",
        type: "file",
        icon: "description",
        iconColor: "text-primary",
        section: "projects",
      },
    ],
  },
  // {
  //   id: "writing",
  //   name: "Writing",
  //   type: "folder",
  //   icon: "folder",
  //   section: "writing",
  //   children: [
  //     {
  //       id: "articles",
  //       name: "articles.md",
  //       type: "file",
  //       icon: "article",
  //       iconColor: "text-primary",
  //       section: "writing",
  //     },
  //   ],
  // },
  {
    id: "resume",
    name: "resume.pdf",
    type: "file",
    icon: "picture_as_pdf",
    iconColor: "text-error",
    section: "JACK_WANG",
  },
];

export const searchableItems: SearchableItem[] = [
  {
    id: "nav-home",
    label: "Go to Home",
    description: "About me and what I'm up to",
    icon: "home",
    category: "navigation",
    fileId: "about",
    folderId: "about-folder",
  },
  {
    id: "nav-experience",
    label: "Go to Experience",
    description: "Work history and roles",
    icon: "work",
    category: "navigation",
    fileId: "experience",
    folderId: "work",
  },
  {
    id: "nav-stack",
    label: "Go to Tech Stack",
    description: "Languages, frameworks, and tools",
    icon: "terminal",
    category: "navigation",
    fileId: "stack-config",
    folderId: "work",
  },
  {
    id: "nav-projects",
    label: "Go to Projects",
    description: "Open-source work and experiments",
    icon: "deployed_code",
    category: "navigation",
    fileId: "featured-projects",
    folderId: "projects",
  },
  // {
  //   id: "nav-writing",
  //   label: "Go to Writing",
  //   description: "Technical articles and notes",
  //   icon: "edit_note",
  //   category: "navigation",
  //   fileId: "articles",
  //   folderId: "writing",
  // },
  {
    id: "nav-resume",
    label: "View Resume",
    description: "Download or view CV",
    icon: "picture_as_pdf",
    category: "navigation",
    fileId: "resume",
  },
  {
    id: "link-x",
    label: "X Profile",
    description: "",
    icon: "open_in_new",
    category: "links",
    href: "https://x.com",
  },
  {
    id: "link-linkedin",
    label: "LinkedIn Profile",
    description: "",
    icon: "open_in_new",
    category: "links",
    href: "https://linkedin.com",
  },
  {
    id: "link-github",
    label: "GitHub Profile",
    description: "",
    icon: "open_in_new",
    category: "links",
    href: "https://github.com",
  },
  {
    id: "link-email",
    label: "Email",
    description: "",
    icon: "mail",
    category: "links",
    href: "mailto:hello@example.com",
  },
];

export function getBreadcrumb(fileId: string): string[] {
  for (const folder of fileTree) {
    if (folder.children) {
      const file = folder.children.find((f) => f.id === fileId);
      if (file) {
        return ["JACK_WANG", folder.name.toLowerCase(), file.name];
      }
    }
    if (folder.id === fileId && folder.type === "file") {
      return ["JACK_WANG", folder.name];
    }
  }
  return ["JACK_WANG"];
}

export function findFileById(fileId: string): FileItem | undefined {
  for (const item of fileTree) {
    if (item.id === fileId) return item;
    if (item.children) {
      const child = item.children.find((c) => c.id === fileId);
      if (child) return child;
    }
  }
  return undefined;
}

export function findParentFolder(fileId: string): string | undefined {
  for (const folder of fileTree) {
    if (folder.children?.some((c) => c.id === fileId)) {
      return folder.id;
    }
  }
  return undefined;
}

export function getAllFolderIds(): string[] {
  return fileTree.filter((item) => item.type === "folder").map((f) => f.id);
}

export function getAllFiles(): FileItem[] {
  const files: FileItem[] = [];
  for (const item of fileTree) {
    if (item.type === "file") files.push(item);
    if (item.children) files.push(...item.children);
  }
  return files;
}
