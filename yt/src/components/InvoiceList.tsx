import { IInvoice } from "@/hooks/useInvoices"
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from "./ui/button";

interface IInvoiceListProps {
  invoices: IInvoice[];
  setSelectedInvoiceId: Dispatch<SetStateAction<string>>
  deleteInvoice: (id:string) => void;
}

const InvoiceList = ({invoices, setSelectedInvoiceId, deleteInvoice}:IInvoiceListProps) => {
 
  const handleDeleteButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => {
    e.stopPropagation()
    deleteInvoice(id)
  }
  return (
    <div className="w-full h-5/6 flex flex-col gap-4">
      {invoices.map((invoice, index) => (
        <button onClick={() => setSelectedInvoiceId(invoice.id)} key={invoice.id} 
        className="w-full h-fit border rounded p-4 cursor-pointer transition-all hover:shadow hover:bg-secondary text-left relative">
          
          <Button size="sm" variant={"destructive"} className="absolute -top-2 -right-2" onClick={(e) => handleDeleteButtonClick(e, invoice.id)}>
            X
          </Button>
          <p>Invoice #{index + 1}</p>
          <p>${invoice.total}</p>
        </button>
      ))}
    </div>
  )
}

export default InvoiceList