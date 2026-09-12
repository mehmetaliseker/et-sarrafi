import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { editorial } from "@/data/pages";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCta({ animated = false }: { animated?: boolean }) {
  const content = <><div><h2 id="contact-cta-title">{editorial.cta.title}</h2><p>{editorial.cta.text}</p></div><LinkButton href="/iletisim">{editorial.cta.action}</LinkButton></>;
  return <section aria-labelledby="contact-cta-title" className="contact-cta"><Container>{animated ? <Reveal className="cta-inner">{content}</Reveal> : <div className="cta-inner">{content}</div>}</Container></section>;
}
