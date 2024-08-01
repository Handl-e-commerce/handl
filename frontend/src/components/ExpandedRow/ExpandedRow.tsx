import React from "react";
import { vendorRow } from "../../types/types";

interface IExpandedRowProps {
    row: vendorRow;
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
                <div>Name: {row.name.toUpperCase()}</div>
                <div>Description: {row.description}</div>
                <div>Website: {row.website}</div>
                <div>Categories: {row.categories}</div>
                <h4>Contact Info</h4>
                {row.people.map((person) => {
                  return <div>People: {person}</div>
                })}
                <div>Email: {row.email}</div>
                <div>Phone Number: {row.phoneNumber}</div>
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