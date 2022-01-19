import { chunks } from "..";

export function readApplication(data, fileInfo) {
  const updated = data.map((d) => {
    return {
      applicant: { email: d[6].trim(), phone: d[5] },
      job: { job_id: d[0] },
      action: {
        name: d[1].trim(),
        date: d[2],
        created_by: { name: d[4].trim() },
      },
    };
  });

  const chunked = chunks(updated, 100);
  return chunked;
}
