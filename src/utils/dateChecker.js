export default function dateChecker(lastSeenString) {
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
