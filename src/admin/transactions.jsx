import{useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {useTable} from 'react-table'


function Transactions(){
    const[transactions, setTransactions] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get("https://api.rhonpesa.online/api/v1/transactions")
            .then(response=>{
                console.log("memo response:", response.data);
                setTransactions(response.data);
            })
            .catch(err=>console.log("error:", err));
        }
        fetchData();
       
    }, [])

    const data = useMemo(() => transactions, [transactions]);
    const columns = useMemo(
      () => [
        {
          Header: "Merchant Name",
          accessor: "merchant.business_name",
        },
        {
          Header: "Merchant code",
          accessor: "merchant.account_number",
        },
        {
          Header: "Merchant phone number",
          accessor: "customer_phone",
        },
        {
            Header: "Code",
            accessor: "transaction_code",
          },
          {
            Header: "Phone number",
            accessor: "merchant.phone",
          },
          {
            Header:"Amount",
            accessor:"amount"
          }
      ],
      []
    );
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
      useTable({ columns, data });
  
    return (
        <div className='w-full'>
          <table {...getTableProps()} className='w-full'>
            <thead className='w-full bg-lime-200 text-2xl'>
              {headerGroups.map((headerGroup) => (
                
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
               
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className='w-full bg-violet-100 text-center'>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="bg-slate-300 py-4">
                    {row.cells.map((cell) => ( 
                      <td {...cell.getCellProps()}> 
                        <div className='bg-slate-200 rounded-lg text-lg py-2 hover:bg-white'>
                            {cell.render("Cell")} 
                        </div>
                    </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    );
}
export default Transactions