import { PortfolioShell } from "@/components/portfolio-shell";
import { getPortfolioItems } from "@/lib/content";

export default function HomePage() {
  return <PortfolioShell items={getPortfolioItems()} />;
}

