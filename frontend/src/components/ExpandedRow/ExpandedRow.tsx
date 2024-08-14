import React from "react";
import { Vendor } from "../../types/types";
import { Row } from "@tanstack/react-table";

interface IExpandedRowProps {
    row: Row<Vendor>;
};

function ExpandedRow({row}: IExpandedRowProps): JSX.Element {
  return (
    <tr style={{ display: "flex", width: "300%"}}>
        <td style={{ flex: "1" }}>
        <div>
            <h4>Company Information</h4>
            <div>{(row.getValue("name") as string).toUpperCase()}</div>
            <div>{row.getValue("description")}</div>
        </div>
        </td>
        <td>
        <div>
            <h4>People</h4>
            {(row.getValue("people") as string[]).map((person, i) => {
                return <div key={i}>People: {person}</div>
            })}
            <h4>Categories</h4>
            {(row.getValue("categories") as string).split(",").map((category: string, i: number) => (
            <div key={i}>{category}</div>
            ))}
            <h4>Contact Info</h4>
            <a href={row.getValue("website")}>{row.getValue("website")}</a>
            {/* TODO: (LOW) Replace Phone Number and Email with icons also for address */}
            <div>Phone Number: {(row.getValue("phoneNumber") as string)}</div>
            <div>Email: {(row.getValue("email") as string)}</div>
            <div>{row.getValue("address") + ", " + row.getValue("city")}</div>
            <div>{row.getValue("state") + ", " + row.getValue("zipcode")}</div>
        </div>
        </td>
    </tr>
  );
};

export { ExpandedRow };