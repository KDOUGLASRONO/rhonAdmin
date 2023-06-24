import {useState, useEffect, useMemo} from 'react'
import axios from "axios"
import {useTable} from 'react-table'
import baseURL from '../baseURL'


const withdrawalsApi = "https://api.rhonpesa.online/api/v1/withdrawals"
const localWithdrawalsApi = `${baseURL}/api/v1/withdrawals`

function Withdrawals(){
    const [withdrawals, setWithdrawals] = useState([]);
    const [localWithdrawals, setLocalWithdrawals] = useState([])
    const [error, setError] = useState("");

    useEffect(()=>{

        const getWithdrawals = async()=>{
            axios.all([axios.get(withdrawalsApi),axios.get(localWithdrawalsApi)])
            .then(
              axios.spread((...responses)=>{
                setWithdrawals(responses[0].data);
                setLocalWithdrawals(responses[1].data);
              })
            )
            .catch((error)=>{
                console.log("error:",error);
                setError("something went wrong");
            })
        }
        getWithdrawals();
    },[])

    const data = useMemo(() => localWithdrawals.concat(withdrawals), [withdrawals]);
    const columns = useMemo(
      () => [
        {
          Header: "Client",
          accessor: "merchant.business_name",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },/*
        {
          Header: "client phone",
          accessor: "merchant.phone",
        },
        {
            Header: "tranx xode",
            accessor: `transaction_code`,
          },
          {
            Header: "Recipient",
            accessor: "paid_to",
          },
          {
            Header:"status",
            accessor:"status"
          },*/
          {
            Header:"Date",
            accessor:"createdAt"
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
    )
}
export default Withdrawals