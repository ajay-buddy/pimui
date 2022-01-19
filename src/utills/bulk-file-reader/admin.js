import { TYPE } from "../../constants";
import { chunks } from "..";

export function readAdmin(data, fileInfo) {
  const updated = data.map((d) => ({
    username: d[1].trim(),
    password: "%^VB^^ggY&b",
    user_type: TYPE.ADMIN,
    profile: {
      name: d[0].trim(),
      email: d[1].trim(),
      emp_code: d[2].trim(),
    },
  }));

  const chunked = chunks(updated, 100);
  return chunked;
}
