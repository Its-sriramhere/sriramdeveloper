import BlurText from "@/components/fx/BlurText";

export function SectionNumber({ index, label }: { index: string; label: string }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">
      {index} / {label}
    </p>
  );
}

export function SectionHeading({
  no,
  label,
  title,
  text,
}: {
  no?: string;
  label?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      {no ? <SectionNumber index={no} label={label ?? ""} /> : null}
      <h2 className="display-section mt-3 text-ivory">
        <BlurText as="span" text={title} delay={120} direction="top" stepDuration={0.4} />
      </h2>
      {text ? <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white">{text}</p> : null}
    </div>
  );
}
