// src/lib/types.ts
export interface Employee {
  id: number;
  name: string;
  title: string;
  profile_pic: string;
  reports?: Employee[];
}