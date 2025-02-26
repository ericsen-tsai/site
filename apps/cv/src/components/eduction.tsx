import { Card, CardContent, CardHeader, Section } from "@erichandsen/ui";

import { type RESUME_DATA } from "../constants";

type Education = (typeof RESUME_DATA)["education"][number];

interface EducationPeriodProps {
  start: Education["start"];
  end: Education["end"];
}

/**
 * Displays the education period in a consistent format
 */
function EducationPeriod({ start, end }: EducationPeriodProps) {
  return (
    <div className="text-sm tabular-nums text-gray-500" aria-label={`Period: ${start} to ${end}`}>
      {start} - {end}
    </div>
  );
}

interface EducationItemProps {
  education: Education;
}

/**
 * Individual education card component
 */
function EducationItem({ education }: EducationItemProps) {
  const { school, start, end, degree } = education;

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-0 p-0 py-1">
        <div className="flex items-center justify-between text-base">
          <h3
            className="font-semibold leading-none"
            id={`education-${school.toLowerCase().replaceAll(/\s+/g, "-")}`}
          >
            {school}
          </h3>
          <EducationPeriod start={start} end={end} />
        </div>
      </CardHeader>
      <CardContent
        className="text-foreground/80 p-0 font-mono text-xs print:mt-1 print:text-[10px]"
        aria-labelledby={`education-${school.toLowerCase().replaceAll(/\s+/g, "-")}`}
      >
        {degree}
      </CardContent>
    </Card>
  );
}

interface EducationListProps {
  education: readonly Education[];
}

/**
 * Main education section component
 * Renders a list of education experiences
 */
export function Education({ education }: EducationListProps) {
  return (
    <Section>
      <h2 className="text-xl font-bold" id="education-section">
        Education
      </h2>
      <div className="space-y-4" role="feed" aria-labelledby="education-section">
        {education.map((item) => (
          <EducationItem key={item.school} education={item} />
        ))}
      </div>
    </Section>
  );
}
