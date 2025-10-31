import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white/50 backdrop-blur-sm rounded-xl border border-[#D3B8A1]/20 px-6"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-[#2B2B2B]/80 leading-relaxed pb-6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
