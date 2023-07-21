export function convertTimeStringToMinutes(time: string): any {
  const [hours, minutes] = time.split(":");

  return  Number(hours) * 60 + Number(minutes);

}
