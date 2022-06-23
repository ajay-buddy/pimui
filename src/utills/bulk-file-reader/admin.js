import { TYPE } from "../../constants";
import { chunks } from "..";

export function readAdmin(data, fileInfo) {
  data.splice(0,1);
  let updated = data.map((d) => ({
    username: d[1]?.trim(),
    password: "%^VB^^ggY&b",
    user_type: TYPE.ADMIN,
    profile: {
      name: d[0]?.trim(),
      email: d[1]?.trim(),
      emp_code: d[2]?.trim(),
      status: d[3]?.trim(),
      user_type: TYPE.ADMIN,
    },
  }));
  updated = updated.filter(d => !!d.username)

  const chunked = chunks(updated, 10);
  return chunked;
}
