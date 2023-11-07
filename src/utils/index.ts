export function formatDate(date: string) {
  var d = new Date(date);
  var final = d.toISOString().slice(0, 10);

  return final;
}
