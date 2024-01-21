import { IProduct } from "@/hooks/useInvoices";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

type FormValues = {
  cart: Omit<IProduct, "id">[];
};

interface INewInvoiceProps {
  addInvoice: (products: Omit<IProduct, "id">[]) => void;
}

const NewInvoice = ({ addInvoice }: INewInvoiceProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "Products", price: 1, quantity: 1 }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });

  const onSubmit = (data: FormValues) => {
    addInvoice(data.cart);
  };

  return (
    <div className="w-full h-fit p-4 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Create A New Invoice</h1>
        <p className="text-sm">Press the button below.</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Create New Invoice</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Your Invoice</AlertDialogTitle>
            <AlertDialogDescription>
              Add your products below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <Button onClick={() => append({ name: "", price: 0, quantity: 0 })}>
              Add Product
            </Button>
            <div className="w-full max-h-96 flex flex-col overflow-y-auto gap-4 no-scrollbar p-4">
              {fields.map((field, index) => {
                return (
                  <div
                    className="w-full flex flex-col gap-2 p-4 border rounded relative"
                    key={field.id}
                  >
                    <Button
                      className="absolute -top-2 -right-2 z-10"
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => remove(index)}
                    >
                      X
                    </Button>
                    <div className="w-full flex gap-4">
                      <div className="w-1/2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          {...register(`cart.${index}.name` as const, {
                            required: true,
                          })}
                        />
                      </div>

                      <div className="w-1/2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          type="number"
                          id="quantity"
                          {...register(`cart.${index}.quantity` as const, {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-col">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        type="number"
                        id="price"
                        {...register(`cart.${index}.price` as const, {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Create</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewInvoice;
