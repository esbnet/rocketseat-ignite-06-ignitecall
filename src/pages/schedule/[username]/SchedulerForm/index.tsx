import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

export default function SchedulerForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  function handleClearSelectDateTime() {
    setSelectedDateTime(null);
  }
  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSelectDateTime}
      />
    );
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />;
}
