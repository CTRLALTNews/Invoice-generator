import { useState } from "react"
import InvoiceList from "./components/InvoiceList"
import NewInvoice from "./components/NewInvoice"
import useInvoices from "./hooks/useInvoices"
import InvoiceShowcase from "./components/InvoiceShowcase"

function App() {
  const {addInvoice, invoices, getInvoice, deleteInvoice} = useInvoices()
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("")
  return (
    <div className="w-full h-screen flex divide-y divide-x-0 sm:divide-x sm:divide-y-0 p-8 flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 h-fit flex flex-col divide-y">
        <NewInvoice addInvoice={addInvoice}/>
        <InvoiceList invoices={invoices} deleteInvoice={deleteInvoice} setSelectedInvoiceId={setSelectedInvoiceId}/>
      </div>
      <div className="w-full sm:w-1/2 h-full">
        {selectedInvoiceId !== "" && (
          <InvoiceShowcase selectedInvoiceId={selectedInvoiceId} getInvoice={getInvoice}/>
        )}
      </div>
    </div>
  )
}

export default App
