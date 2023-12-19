import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

const RadioList = ({ data, eleccion }) => {
  
  

  const columns = React.useMemo(
    () => [
      { Header: 'Dirección', accessor: 'Dirección' },
      { Header: 'Localidad', accessor: 'Localidad' },
      { Header: 'Precio (€/L)', accessor: `${eleccion.combustible}` },
      { Header: 'Distancia (Km)', accessor: 'distancia' },
    ],
    [eleccion.combustible]
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
    <>

        <h4>Radio: {eleccion.radio} km. </h4>
        {eleccion.combustible === "Precio Gasoleo A" ? <h4>Combustible: Diesel</h4> : <h4>Combustible: Gasolina</h4>}

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
                
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                      <td {...cell.getCellProps()}><Link to={ruta} >{cell.render('Cell')}</Link></td>                
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
    </>
  );
};

export default RadioList;
