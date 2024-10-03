import Timeline from "@/components/reading-timeline/timeline";

export const dynamic = "force-dynamic";

export default function ReadingTimeline() {
  return (
    <div className="min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      <Timeline />
    </div>
  );
}
