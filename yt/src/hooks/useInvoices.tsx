import { useState } from "react";
import {v4 as uuidv4} from "uuid"

export interface IProduct {
  name: string;
  price: number;
  id: string;
  quantity: number;
}

export interface IInvoice {
  id: string;
  total: number;
  products: IProduct[]
}

const useInvoices = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([])

  const addInvoice = (products: Omit<IProduct, "id">[]) => {
    const productsWithId = products.map((product) => {
      const id = uuidv4()
      return {...product, id: id}
    })

    const invoiceId = uuidv4()
    
    const invoiceTotal = productsWithId.reduce((acc, curr) => {
      const productTotalWithQuantity = curr.price * curr.quantity
      return acc + productTotalWithQuantity
    }, 0)

    const invoice:IInvoice = {
      id: invoiceId,
      products: productsWithId,
      total: invoiceTotal
    }

    setInvoices((invoices) => [...invoices, invoice])
  }

  const getInvoice = (id:string) => {
    return invoices.filter(invoice => invoice.id === id)[0]
  }

  const deleteInvoice = (id:string) => {
    const invoicesWithoutDeletedInvoice = invoices.filter(invoice => invoice.id !== id)
    setInvoices(invoicesWithoutDeletedInvoice)
  }

  return {
    invoices,
    addInvoice,
    getInvoice,
    deleteInvoice
  }
}

export default useInvoices