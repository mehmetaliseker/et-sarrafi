import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

interface PageIntroProps { title: string; description: string; eyebrow: string; className?: string; }
export function PageIntro({ title, description, eyebrow, className = "" }: PageIntroProps) {
  return <section className={`page-intro ${className}`}><Container>
    <Breadcrumb items={[{ label: "Ana sayfa", href: "/" }, { label: eyebrow }]} />
    <div className="intro-grid"><div><p className="eyebrow">{eyebrow}</p><h1 className="display-title">{title}</h1></div><p className="intro-description">{description}</p></div>
  </Container></section>;
}
