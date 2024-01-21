import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IInvoice } from "@/hooks/useInvoices";

interface IInvoiceShowcaseProps {
  selectedInvoiceId: string;
  getInvoice: (id: string) => IInvoice;
}

const InvoiceShowcase = ({
  getInvoice,
  selectedInvoiceId,
}: IInvoiceShowcaseProps) => {
  const [invoice, setInvoice] = useState<IInvoice>();

  useEffect(() => {
    setInvoice(getInvoice(selectedInvoiceId));
  }, [selectedInvoiceId]);

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-96 h-fit max-h-full p-4 border rounded flex flex-col gap-8">
        <div className="w-full h-fit flex flex-col gap-4 items-center p-4">
          <img src="/vite.svg" alt="logo" className="w-24 h-24 saturate-0" />
          <p className="text-xl font-black">CTRL ALT News Inc.</p>
        </div>
        <Separator />
        <div className="w-full h-fit flex flex-col gap-4">
          <p className="text-lg font-bold">Contact Info</p>
          <ul>
            <li>Address: Street Name, State 9999</li>
            <li>Email: JaneDoe@outlook.com</li>
            <li>Phone: 999-999-9999</li>
          </ul>
        </div>
        <Separator />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice?.products.map((product) => (
              <TableRow id={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-secondary">
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>${invoice?.total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Separator />
        <div className="w-full h-fit text-xs">
          This is a receipt for goods and services purchased. Payment will be
          processed within 5-7 business days.
          <p>Invoice ID: {selectedInvoiceId}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceShowcase;
