import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { editorial } from "@/data/pages";

export function ContactCta() {
  return <section aria-labelledby="contact-cta-title" className="contact-cta"><Container className="cta-inner"><div><h2 id="contact-cta-title">{editorial.cta.title}</h2><p>{editorial.cta.text}</p></div><LinkButton href="/iletisim">{editorial.cta.action}</LinkButton></Container></section>;
}
