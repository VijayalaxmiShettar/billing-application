import React, {useState} from 'react'
import {TablePagination} from '@material-ui/core';

const TablePaginate = (props)=>{
    const {dataSize} = props
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return (
        <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={dataSize}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
    )

}

export default TablePaginate