import React, { useState } from "react";
import "./tabel.css";
import { getTableRow } from "../../../utills/tabel";
import { Button } from "@material-ui/core";

export default function ListView({
  headers,
  list,
  onView,
  onEdit,
  onDelete,
  type,
  viewDetails,
  details,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsId, setShowDetailsId] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        overflow: "scroll",
      }}
    >
      <table>
        <tr>
          {headers.map((d) => (
            <th>{d.label}</th>
          ))}
          {onView && <th>View</th>}
          {onEdit && <th>Edit</th>}
          {viewDetails && <th>View Details</th>}
          {/* {onDelete && <th>Delete</th>} */}
        </tr>
        {list?.map((d) => (
          <>
            <tr>
              {headers.map((h) => getTableRow(h, d))}
              {onView && (
                <td
                  onClick={() => {
                    window.scroll({ top: 0, behavior: "smooth" });
                    onView(d);
                  }}
                >
                  <Button>View</Button>
                </td>
              )}
              {onEdit && (
                <td
                  onClick={() => {
                    window.scroll({ top: 0, behavior: "smooth" });
                    onEdit(d);
                  }}
                >
                  <Button>Edit</Button>
                </td>
              )}
              {viewDetails && (
                <td
                  onClick={() => {
                    if(showDetailsId == d.id) return setShowDetailsId(null)
                    setShowDetailsId(d.id);
                    viewDetails(d);
                  }}
                >
                  <Button>View Status</Button>
                </td>
              )}
              {/* {onDelete && <td onClick={() => onDelete(d.id)}>Delete</td>} */}
            </tr>
            {showDetailsId === d.id ? (
              <>
              <tr>
              {details.headers.map((d) => (
                <th>{d.label}</th>
              ))}
            </tr>
            {details.list.map((d) => <tr>
              {details.headers.map((h) => getTableRow(h, d))}
            </tr>)}
            </>
            ) : null}
          </>
        ))}
      </table>
    </div>
  );
}
