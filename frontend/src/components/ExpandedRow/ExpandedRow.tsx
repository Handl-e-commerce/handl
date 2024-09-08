import React from "react";
import { Vendor } from "../../types/types";
import { MRT_Row } from "material-react-table";

interface IExpandedRowProps {
    row: Vendor;
};

function ExpandedRow({row}: IExpandedRowProps): JSX.Element {
    return (
        <div style={{ display: "flex"}}>
            <div style={{ flex: "1" }}>
            <div>
                <h4>Company Information</h4>
                <div>{row.name.toUpperCase()}</div>
                <div>{row.description}</div>
            </div>
            </div>
            <div>
                <div>
                    <h4>People</h4>
                    {row.people.map((person, i) => (
                        <div key={i}>{person}</div>
                    ))}
                    <h4>Categories</h4>
                    {row.categories.split(",").map((category: string, i: number) => (
                        <div key={i}>{category}</div>
                    ))}
                    <h4>Contact Info</h4>
                    <a href={row.website}>{row.website}</a>
                    {/* TODO: (LOW) Replace Phone Number and Email with icons also for address */}
                    <div>{row.phoneNumber}</div>
                    <div>{row.email}</div>
                    <div>{row.address + ", " + row.city}</div>
                    <div>{row.state + ", " + row.zipcode}</div>
                </div>
            </div>
        </div>
    );
};

export { ExpandedRow };