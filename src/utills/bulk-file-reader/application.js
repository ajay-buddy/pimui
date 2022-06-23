import { chunks } from "..";

export function readApplication(data, fileInfo) {
  data.splice(0,1);
  let updated = data.map((d) => {
    return {
      applicant: { email: d[5]?.trim(), phone: d[4] },
      job: { job_id: d[0] },
      action: {
        name: d[1]?.trim(),
        date: d[2],
        created_by: { email: d[3]?.trim() },
      },
    };
  });

  updated = updated.filter(d => d.applicant && !!d.applicant.email)

  const chunked = chunks(updated, 100);
  return chunked;
}
