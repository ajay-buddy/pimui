import React, { useState } from "react";
import "./tabel.css";
import { getTableRow } from "../../../utills/tabel";

export default function ListView({
  headers,
  list,
  onView,
  onEdit,
  onDelete,
  type,
}) {
  return (
    <>
      {
        <table>
          <tr>
            {headers.map((d) => (
              <th>{d.label}</th>
            ))}
            {onView && <th>View</th>}
            {onEdit && <th>Edit</th>}
            {onDelete && <th>Delete</th>}
          </tr>
          {list?.map((d) => (
            <tr>
              {headers.map((h) => getTableRow(h, d))}
              {onView && <td onClick={() => onView(d)}>View</td>}
              {onEdit && <td onClick={() => onEdit(d)}>Edit</td>}
              {onDelete && <td onClick={() => onDelete(d.id)}>Delete</td>}
            </tr>
          ))}
        </table>
      }
    </>
  );
}
