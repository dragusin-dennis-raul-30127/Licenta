import { useTable } from 'react-table';
import './Table.scss'
export const Table = ({ columns: columns, data: data }) => {
    console.log(columns)
    console.log(data)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    const filterData = (row) => {
        return Object.keys(row).filter((entry) => entry !== '_id' && entry !== '__v' && entry !=='password');
    };

    const modifyValue = (key, value) => {
        if (key === 'problems') {
            return value === true ? 'DA' : 'NU';
        }

        if (key === 'date') {
            return new Intl.DateTimeFormat('ro-RO', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
        }
        if (key === 'isEntering') {
            return value === true ? 'Entering' : 'Exiting';
        }

        return value;
    };

    return (
        <table className="table-container" {...getTableProps()}>
            <thead className="header">
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th className="cell-details" {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}

            </thead>
            {/* <tbody className="body"{...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td classname="body-cell-details" style={{ padding: "4px" }} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody> */}
            <tbody className="body">
                {data.map(row => {
                    return (
                        <tr>
                            {filterData(row).map(key => {
                                return (
                                    <td>{modifyValue(key, row[key])}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
