export const formatDate = (
  dateString: string,
  includeTime: boolean = false
): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const day = date.getDate();
  let daySuffix = "th";

  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  const formattedDate = date.toLocaleDateString("en-US", options);
  const dayWithoutSuffix = formattedDate.replace(/\d+/, day.toString());
  const dateWithSuffix = dayWithoutSuffix.replace(
    day.toString(),
    `${day}${daySuffix}`
  );

  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${dateWithSuffix}, ${hours}:${minutes}:${seconds}`;
  }

  return dateWithSuffix;
};
