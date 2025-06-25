export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const isPhone10 = (s: string) => /^\d{10}$/.test(s.replace(/\D/g, ""));
export const minFence = (len: number) => len >= 100;