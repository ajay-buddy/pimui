import { chunks } from "..";

export function readJob(data, fileInfo) {
  const updated = data.map((d) => {
    return {
      name: d[4].trim(),
      spoc: { spoc_id: d[6].trim() },
      job_tags: d[4]
        .trim()
        ?.split(",")
        .map((e) => ({ name: e })),
      type: d[3].trim(),
      req_id: d[0],
      submited_by: d[2].trim(),
      priority: d[5].trim(),
      req_date: d[1],
    };
  });

  const chunked = chunks(updated, 100);
  return chunked;
}
