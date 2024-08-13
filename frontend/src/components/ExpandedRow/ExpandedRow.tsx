import React from "react";
import { VendorRow } from "../../types/types";

interface IExpandedRowProps {
    row: VendorRow;
    ids: string[];
};

function ExpandedRow({row, ids}: IExpandedRowProps): JSX.Element {
  return (
    <>
        {ids.includes(row.id) && (
          <tr style={{ display: "flex", gridColumn: "1 / -1" }}>
            <td style={{ flex: "1" }}>
              <div>
                <h4>Company Information</h4>
                <div>{row.name.toUpperCase()}</div>
                <div>{row.description}</div>
              </div>
            </td>
            <td>
              <div>
                <h4>People</h4>
                {row.people.map((person, i) => {
                  return <div key={i}>People: {person}</div>
                })}
                <h4>Categories</h4>
                {row.categories.split(",").map((category: string, i: number) => (
                  <div key={i}>{category}</div>
                ))}
                <h4>Contact Info</h4>
                <a href={row.website}>{row.website}</a>
                {/* TODO: (LOW) Replace Phone Number and Email with icons also for address */}
                <div>Phone Number: {row.phoneNumber}</div>
                <div>Email: {row.email}</div>
                <div>{row.address + ", " + row.city}</div>
                <div>{row.state + ", " + row.zipcode}</div>
              </div>
            </td>
          </tr>
        )}
    </>
  );
};

export { ExpandedRow };