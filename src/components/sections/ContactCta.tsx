import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { editorial } from "@/data/pages";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface ContactCtaProps { animated?: boolean; className?: string; title?: string; description?: string; }
export function ContactCta({ animated = false, className, title = editorial.cta.title, description = editorial.cta.text }: ContactCtaProps) {
  const content = <><div><h2 id="contact-cta-title">{title}</h2><p>{description}</p></div><LinkButton href="/iletisim">{editorial.cta.action}</LinkButton></>;
  return <section aria-labelledby="contact-cta-title" className={cn("contact-cta", className)}><Container>{animated ? <Reveal className="cta-inner">{content}</Reveal> : <div className="cta-inner">{content}</div>}</Container></section>;
}
