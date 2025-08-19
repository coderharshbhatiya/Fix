export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export const appName = 'FixWale';
