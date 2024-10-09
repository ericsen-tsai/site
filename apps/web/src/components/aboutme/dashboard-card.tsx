import { Card, CardContent, CardHeader } from "@erichandsen/ui";
import * as React from "react";

type Props = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

function DashboardCard({ title, icon, content }: Props) {
  return (
    <Card className="border-card-foreground/50 text-card-foreground mx-auto w-full border-[0.01rem]">
      <CardHeader className="flex flex-row items-center gap-2 p-4 text-sm">
        {icon}
        {title}
      </CardHeader>
      <CardContent className="p-4 pt-0 text-right">{content}</CardContent>
    </Card>
  );
}

export default DashboardCard;
