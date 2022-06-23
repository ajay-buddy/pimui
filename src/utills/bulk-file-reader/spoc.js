import { chunks } from "..";

export function readSpoc(data, fileInfo) {
  data.splice(0,1);
  let updated = data.map((d) => ({
    name: d[1],
    company: { name: d[2]?.trim() },
    email: d[3]?.trim(),
    recruiters: d[6]?.trim()?.split(",")
      .map((e) => ({ name: e })),
    owner: { name: d[5]?.trim() },
    spoc_id: d[0]?.trim(),
    phone: d[4],
    status: d[7]?.trim(),
  }));
  updated = updated.filter(d => !!d.name)
  const chunked = chunks(updated, 100);
  return chunked;
}
