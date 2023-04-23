import { useTable } from 'react-table';
import './Table.scss'
export const Table = ({columns: columns, data: data}) => {
    console.log(columns)
    console.log(data)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

    return(
        <table {...getTableProps()}>
                <thead className="header">
                    {headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column)=>(
                                <th className="cell-details" {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                   
                </thead>
                <tbody className="body"{...getTableBodyProps()}>
                    {rows.map((row)=>{
                        prepareRow(row);
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell)=>(
                                    <td classname="body-cell-details" style={{padding:"4px"}} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    )
}
