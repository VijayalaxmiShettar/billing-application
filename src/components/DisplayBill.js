import React, {useState, useEffect, useRef} from 'react'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'
import '../styles/styles.css'
import PrintIcon from '@material-ui/icons/Print';
import {IconButton, Paper} from '@material-ui/core'

const DisplayBill = (props)=>{
    
    const {lineItems, date, name, total, phone} = props.location.state
    const adminDetails =useSelector((state)=>{
        return state.adminDetails
    })
    
    const handleCancel =()=>{
        props.history.push('/billing')
    }
    const invoiceRef = useRef();
    const handleDownload = ()=> {
    
        html2canvas(invoiceRef.current)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                // console.log(canvas.height)
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("invoice.pdf");  
            })
    }
    
    return (
        <div ref={invoiceRef}>
            <Paper  style={{width:'60%', minHeight:'500px', marginTop:'60px', padding:'20px'}}>
            
                <IconButton size="small" onClick={handleDownload}>
                    <PrintIcon/>
                </IconButton>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <div>
                        <h2>INVOICE</h2>
                    </div>
                    <div>
                        <p><b>{adminDetails.businessName}</b></p>
                        <p>{adminDetails.address}</p>
                    </div>
                </div>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <div><p>{`Bill to -  ${name}`}</p><p>{`Mobile - ${phone}`}</p></div>
                        <p>{`Date -  ${date.toDateString()}`}</p>
                    </div>
                
                <table border="1" style={{ borderCollapse:'collapse', margin:'5px', padding:'5px', width:'90%'}}>
                    <thead>
                        <tr>
                            <th className="thStyle">#</th>
                            <th className="thStyle">Item</th>
                            <th className="thStyle">Qty</th>
                            <th className="thStyle">Rate</th>
                            <th className="thStyle">Sub-total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {lineItems.map((item, i)=>{
                                return <tr>
                                    <td>{i+1}</td>
                                    <td>{item.prodName || item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            })}
                    </tbody>
                </table>
                <div style={{width:'30%', float:'right'}}>
                <p>Total: Rs. {total.toLocaleString()}</p>
                </div>
            
            </Paper>
            </div>   
    )
}

export default withRouter(DisplayBill)