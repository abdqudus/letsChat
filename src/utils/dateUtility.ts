export default function dateConverter(lastSeenString: string) {
  const currentTIme = new Date(Date.now()).toLocaleString();
  const lastSeenDate = lastSeenString.split(" ")[1].slice(0, -1);
  let string;
  if (currentTIme.split("/")[1] === lastSeenDate) {
    string = "today";
  } else if (Number(currentTIme.split("/")[1]) - Number(lastSeenDate) === 1) {
    string = "yesterday";
  } else {
    string = lastSeenString;
  }
  return string;
}
export const formatDate = (lastOnline: string) => {
  return new Date(lastOnline).toLocaleString("en-US", {
    hour12: true,
    timeStyle: "short",
    dateStyle: "medium",
  });
};

export const formatLastSeen = (lastSeen: string) => {
  const formattedLastSeen = formatDate(lastSeen);
  const day = dateConverter(formattedLastSeen);
  const time = formattedLastSeen.slice(13);
  let lastSeenString: string;
  if (day === "today" || day === "yesterday") {
    lastSeenString = `last seen ${day} at ${time} `;
  } else {
    lastSeenString = `last seen on ${day}  `;
  }
  console.log(lastSeenString);
  return lastSeenString;
};
