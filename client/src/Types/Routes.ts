export const ROUTES = {
  LOGIN: "login",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
