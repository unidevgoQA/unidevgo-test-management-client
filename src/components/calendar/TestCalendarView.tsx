import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  date: Date;
  title: string;
  type: string;
  description: string;
  color: string;
}

const mockEvents: CalendarEvent[] = [
  {
    date: new Date(2024, 2, 15),
    title: "API Integration Tests",
    type: "Regression",
    description: "Full suite of API integration tests for the payment module",
    color: "bg-blue-500"
  },
  {
    date: new Date(2024, 2, 20),
    title: "Performance Testing",
    type: "Performance",
    description: "Load testing of the user authentication system",
    color: "bg-green-500"
  },
  {
    date: new Date(2024, 2, 25),
    title: "UI Validation",
    type: "Visual",
    description: "Cross-browser testing of the new dashboard components",
    color: "bg-purple-500"
  }
];

export function TestCalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md w-full"
        modifiers={{
          event: (date) => 
            mockEvents.some(event => 
              event.date.toDateString() === date.toDateString()
            )
        }}
        modifiersStyles={{
          event: { fontWeight: 'bold' }
        }}
        components={{
          Day: ({ date: dayDate, ...props }) => {
            const events = mockEvents.filter(
              event => event.date.toDateString() === dayDate.toDateString()
            );

            if (events.length === 0) {
              return <button type="button" {...props}>{dayDate.getDate()}</button>;
            }

            return (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    type="button"
                    {...props}
                    className={cn(
                      props.className,
                      "relative font-segoe",
                      "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
                      "after:flex after:gap-0.5"
                    )}
                  >
                    {dayDate.getDate()}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {events.map((event, i) => (
                        <div
                          key={i}
                          className={cn("w-1 h-1 rounded-full", event.color)}
                        />
                      ))}
                    </div>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    {events.map((event, i) => (
                      <div key={i} className="p-3 rounded-md bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", event.color)} />
                          <h4 className="font-medium">{event.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Type: {event.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          }
        }}
      />
    </Card>
  );
}