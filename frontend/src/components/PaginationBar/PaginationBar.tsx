import React from "react";
import { Pagination } from "@table-library/react-table-library/pagination";
import { vendor, vendorRow } from "../../types/types";
import { IoArrowForwardOutline , IoArrowBackOutline  } from "react-icons/io5";

interface IPaginationBarProps {
    data: {
        nodes: vendorRow[];
    };
    resultsPerPage: number;
    setResultsPerPage: React.Dispatch<React.SetStateAction<number>>;
    pagination: Pagination<vendorRow>;
};

function PaginationBar({data, resultsPerPage, setResultsPerPage, pagination}: IPaginationBarProps): JSX.Element {
    let first = pagination.state.getPageBoundaries(data.nodes).start;
    let end = pagination.state.getPageBoundaries(data.nodes).end;
    
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <select
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(Number(e.target.value))}
            >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <span>{first} - {end} of {data.nodes.length}</span>
            <span>
                {pagination.state.page > 0 &&
                <IoArrowBackOutline 
                    onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}            
                />}
                {pagination.state.getPages(data.nodes).map((node: vendor, index: number) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            style={{
                                fontWeight: pagination.state.page === index ? "bold" : "normal",
                            }}
                            onClick={() => pagination.fns.onSetPage(index)}
                        >
                            {index + 1}
                        </button>
                    )
                })}
                {pagination.state.page < pagination.state.getTotalPages(data.nodes) - 1 &&
                <IoArrowForwardOutline  
                    onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
                />}
            </span>
        </div>
    )
};

export { PaginationBar };