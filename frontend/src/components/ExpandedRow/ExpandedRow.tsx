import React from "react";
import { vendorRow } from "../../types/types";

interface ExpandedRowProps {
    row: vendorRow;
    ids: string[];
};

function ExpandedRow(props: ExpandedRowProps): JSX.Element {
    return (
        <>
            {props.ids.includes(props.row.id) && (
              <tr style={{ display: "flex", gridColumn: "1 / -1" }}>
                <td style={{ flex: "1" }}>
                  <ul
                    style={{
                      margin: "0",
                      padding: "0",
                      backgroundColor: "#e0e0e0",
                    }}
                  >
                    <li>
                      <strong>Name:</strong> {props.row.name.toUpperCase()}
                    </li>
                    <li>
                      <strong>Address:</strong> {props.row.address}
                    </li>
                    <li>
                      <strong>Description:</strong> {props.row.description}
                    </li>
                    <li>
                      <strong>People:</strong> {props.row.people}
                    </li>
                  </ul>
                </td>
              </tr>
            )}
        </>
    );
};

export { ExpandedRow };