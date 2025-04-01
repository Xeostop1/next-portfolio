// types/Project.ts

export type Project = {
    _id: string;
    id: number;
    title: string;
    path?: string;
    subtitle?: string;
    description?: string;
    skills?: string[];
    createdAt: string;
  };
  