import { siteConfig, type SocialAccount, type SocialPlatform } from "@/config/site";
import styles from "./social-links.module.css";

function SocialGlyph({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "instagram":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" /></svg>;
    case "facebook":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M14.2 8.8V7.6c0-.7.5-1.1 1.2-1.1h1.4V3.8h-2.4c-2.4 0-3.9 1.5-3.9 3.9v1.1H8.5v2.8h2v7.9h3.2v-7.9h2.3l.5-2.8h-2.8Z" /></svg>;
    case "x":
      return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M17.6 4.2h2.2l-4.8 5.5 5.6 7.4h-4.4l-3.4-4.5-3.9 4.5H6.7l5.1-5.9L6.5 4.2h4.5l3.1 4.1 3.5-4.1Zm-.8 11.6h1.2L8.3 5.5H7L16.8 15.8Z" /></svg>;
    default: {
      const _exhaustive: never = platform;
      return _exhaustive;
    }
  }
}

interface SocialLinksProps {
  className?: string;
  variant?: "inline" | "icons" | "stack";
}

export function SocialLinks({ className, variant = "inline" }: SocialLinksProps) {
  const accounts = siteConfig.social as ReadonlyArray<SocialAccount>;
  if (accounts.length === 0) return null;

  const showLabel = variant === "inline" || variant === "stack";

  return <ul className={[styles.list, styles[variant], className].filter(Boolean).join(" ")} aria-label="Sosyal medya hesapları">
    {accounts.map((account) => (
      <li key={account.platform}>
        <a href={account.href} target="_blank" rel="noopener noreferrer" aria-label={account.label} title={account.label}>
          <SocialGlyph platform={account.platform} />
          {showLabel ? <span>{account.label}</span> : null}
        </a>
      </li>
    ))}
  </ul>;
}
