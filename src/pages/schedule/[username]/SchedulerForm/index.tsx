import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
// import { ConfirmStep } from "./ConfirmStep";

export default function SchedulerForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()
  
  return (
    <>
      <CalendarStep onSelectDateTime={setSelectedDateTime} />
      {/* <ConfirmStep /> */}
    </>
  );
}
