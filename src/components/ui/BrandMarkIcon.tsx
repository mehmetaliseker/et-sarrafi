export type BrandMarkIconName = "steak" | "cutting" | "shipping" | "farm" | "hygiene";

interface BrandMarkIconProps {
  name: BrandMarkIconName;
}

export function BrandMarkIcon({ name }: BrandMarkIconProps) {
  switch (name) {
    case "steak":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5.5 14.5c0-4.2 3.2-7.5 7.2-7.5 2.6 0 4.8 1.2 6.3 3.1" /><path d="M19.5 12.2c.7 1.2 1.1 2.6 1.1 4.1 0 2.3-1.3 4.2-3.6 4.2-3.4 0-6.2-2.2-7.8-5.2" /><path d="M9.2 9.4c.8-.7 1.9-1.1 3.1-1.1" /><circle cx="13.2" cy="13.6" r="1.1" /></svg>;
    case "cutting":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.5 4.5 4.8 14.2a3.2 3.2 0 0 0 4.5 4.5L19.2 9" /><path d="M16.2 6.8 18 5a2.1 2.1 0 1 1 3 3l-1.8 1.8" /><path d="M8.2 17.8 6 20" /></svg>;
    case "shipping":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>;
    case "farm":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 18.5c1.2-3.8 3.4-6 7.5-6s6.3 2.2 7.5 6" /><path d="M8.2 12.4c-.6-1.8-.3-3.5 1-4.5 1.6-1.2 3.7-.4 4.5 1.1" /><path d="M14.2 9.2c.5-1.2 1.6-2 2.9-1.8" /><path d="M7.5 18.5h9" /></svg>;
    case "hygiene":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3.5 19 7v5.2c0 4.3-2.9 7.4-7 8.8-4.1-1.4-7-4.5-7-8.8V7l7-3.5Z" /><path d="M9.2 12.2 11 14l3.8-3.8" /></svg>;
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}
