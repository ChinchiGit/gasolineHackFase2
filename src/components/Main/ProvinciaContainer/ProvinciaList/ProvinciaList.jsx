import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

const ProvinciaList = ({ data }) => {
  
  

  const columns = React.useMemo(
    () => [
      { Header: 'Dirección', accessor: 'Dirección' },
      { Header: 'Localidad', accessor: 'Localidad' },
      { Header: 'Provincia', accessor: 'Provincia' },
      { Header: 'Diesel', accessor: 'Precio Gasoleo A' },
      { Header: 'Gasolina', accessor: 'Precio Gasolina 95 E5' },

    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const ruta = `/detalles/:${row.original.IDEESS}`
            return (
               
              <tr href={ruta} {...row.getRowProps()} onClick={event =>  window.location.href=`/detalles/:${row.original.IDEESS}`}>
                {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>                
                ))}
              </tr>


            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {Math.ceil(data.length /10)}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
      </div>
    </div>
  );
};

export default ProvinciaList;
