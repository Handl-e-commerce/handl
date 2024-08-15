import React from "react";
import { Vendor } from "../../types/types";
import { MRT_Row } from "material-react-table";

interface IExpandedRowProps {
    row: MRT_Row<Vendor>;
};

function ExpandedRow({row}: IExpandedRowProps): JSX.Element {
    const data = row.original;

    return (
        <div style={{ display: "flex"}}>
            <div style={{ flex: "1" }}>
            <div>
                <h4>Company Information</h4>
                <div>{data.name.toUpperCase()}</div>
                <div>{data.description}</div>
            </div>
            </div>
            <div>
                <div>
                    <h4>People</h4>
                    {data.people.map((person, i) => (
                        <div key={i}>{person}</div>
                    ))}
                    <h4>Categories</h4>
                    {data.categories.split(",").map((category: string, i: number) => (
                        <div key={i}>{category}</div>
                    ))}
                    <h4>Contact Info</h4>
                    <a href={data.website}>{data.website}</a>
                    {/* TODO: (LOW) Replace Phone Number and Email with icons also for address */}
                    <div>{data.phoneNumber}</div>
                    <div>{data.email}</div>
                    <div>{data.address + ", " + data.city}</div>
                    <div>{data.state + ", " + data.zipcode}</div>
                </div>
            </div>
        </div>
    );
};

export { ExpandedRow };