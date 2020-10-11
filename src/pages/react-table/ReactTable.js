import React,{useEffect,useState,useCallback,Fragment} from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Loader from '../Loader';
import ModalForm from './ModalForm'
function Table({ columns, data,open,toggle }) {

  //Use onClick event to render a ModalForm with the values of the user
  ////////////////////////////////////////////////////////////////////
  const [clickedIndex,setIndex] = useState();
  const  onClickRender = (e,index,props,open,toggle) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    toggle();
    setIndex(index);
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState:{pageIndex:2}
  }, useSortBy, usePagination);
  return ( 
    <Fragment>
      <div className="react-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            console.log(row,"imrow")
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell,index) => {
                return index === 2 ? 
                <td {...cell.getCellProps()}>
                <span className="table-toggler" onClick={(e)=> onClickRender(e,row.index,row.original,open,toggle)}>
               View
             </span>  
             <ModalForm toggle={toggle} user={row.original}  open={open} index={row.index} clickedIndex={clickedIndex} className="modal" /> 
               </td>
                :
               <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }
                 )}           
          </tr>)
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button className=" pagination__button pagination__first"  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className=" pagination__button pagination__previous"  onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className="pagination__button pagination__next"  onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className="pagination__button pagination__last" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className="pagination">
          | Go to page:{' '}
          <input className="pagination__button"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px', cursor:'text' }}
          />
        </span>{' '}
        <select  className="pagination__button"

          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>    
      </div>

    </Fragment>
        
  );
}
//Necesary declarations for react-table 
const  ReactTable =({users,loadUsers}) =>  {
  const columns = React.useMemo(
    () => [
      {
        Header: "React-Table",
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Country',
            accessor: 'country',
          },
          { Header: 'Actions', accessor: 'createdAt' },
        ],
      },
    ],
    []
  );

  //Loading data from Redux
  useEffect(() => {
    if (typeof users[0] === 'undefined') {
      loadUsers();
    }
  }, [users, loadUsers]);

  //Modal Toggler
  const useToggle = (initial) => {
    const [open, setOpen] = useState(initial);
    return [open, useCallback(() => setOpen((status) => !status))];
  };
  const [open, toggle] = useToggle(false);
  //Waiting for data to arrive
  return typeof users[0] === 'undefined' ?
    <Loader /> :
    <div className="content-wrap">
      <Table columns={columns} data={users} toggle={toggle} open={open} />
    </div>
}

export default ReactTable;