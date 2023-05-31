import Table from "../../components/Table"
import { useState, useEffect, ChangeEvent } from "react"
import { Customer } from "../../utils/models"
import Button from "../../components/Button";
import Input from "../../components/Input";
import Form from "./Form";
import ModuloConferma from "../../components/ModuloConferma";

const COLUMNS: { name: string; columnName: string }[] = [
    { name: "Id", columnName: "id" },
    { name: "Full name", columnName: "fullName" },
    { name: "Vat Number", columnName: "vatNumber" },
    { name: "City", columnName: "city" },
    { name: "Edit", columnName: "edit" },
];

const Customers = () => {

    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [id, setId] = useState<Number | null>(null);
    const [apriConferma, setApriConferma] = useState(false);
    const [search, setSearch] = useState('');

    const fetchCustomers = async (value: string = '') => {

        const response = await fetch(`http://localhost:5000/customers?q=${value}`);
        const responseJson = await response?.json();
        setCustomers(responseJson);
    };

    useEffect(() => {

        fetchCustomers();
    }, []);

    const handleEdit = (x: Customer) => {

        setCustomer(x)
        setOpen(true)
    }

    const handleClose = () => {

        setOpen(false);
        setCustomer(null);
    }

    const onClickNew = () => {

        setOpen(true)
    }

    //////////////////////////////////////////////////////////////////////////////

    const handleDelete = (id: Number) => {
        setId(id);
        setApriConferma(true);
    }

    const confermaChiusura = () => {

        setId(null)
        setApriConferma(false);
    }

    const confermaCancellazione = async () => {

        await fetch(`http://localhost:5000/customers/${id}`, {
            method: "DELETE",
            headers: {

                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        await fetchCustomers();
        return setApriConferma(false); 
    }

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {

        const search = event.target.value;
        
        setSearch(search);
        fetchCustomers(search);
    }

    return <div>
        <Button onClick={onClickNew}>New</Button>
        <Input label={''} onChange={handleChangeSearch} value={search}/>
        <Form open={open} handleClose={handleClose} fetchCustomers={fetchCustomers} customer={customer}></Form>
        <ModuloConferma open={apriConferma} confermaChiusura={confermaChiusura} confermaCancellazione={confermaCancellazione}></ModuloConferma>
        <Table columns={COLUMNS} data={customers} handleEdit={handleEdit} handleDelete={handleDelete}></Table>
    </div>
}

export default Customers
