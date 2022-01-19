import { TYPE } from "../../constants";
import { chunks } from "..";

export function readCandidates(data, fileInfo) {
  console.log(data);

  const updated = data.map((d) => ({
    username: d[6].trim(),
    password: "%^VB^^ggY&b",
    user_type: TYPE.CANDIDATE,
    profile: {
      name: d[1].trim(),
      profile_tags: d[0] ? d[0].split(",").map((t) => ({ name: t })) : [],
      email: d[6].trim(),
      other_skills: d[8].trim(),
      experience: parseInt(d[2]),
      current_ctc: parseInt(d[3]),
      expected_ctc: parseInt(d[9]),
      c_location: d[4].trim(),
      notice: parseInt(d[10]),
      phone: d[5].trim(),
      headline: d[7].trim(),
    },
  }));

  const chunked = chunks(updated, 100);
  return chunked;
}
