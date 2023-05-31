import { useState, useEffect, ChangeEvent } from "react"
import { Stock } from "../../utils/models";
import Table from "../../components/Table";
import ModuloConferma from "../../components/ModuloConferma";
import Button from "../../components/Button";
import Form from "./Form";
import Input from "../../components/Input";

const COLUMNS: { name: string; columnName: string }[] = [

    { name: "Id", columnName: "id" },
    { name: "Description", columnName: "description" },
    { name: "Cost", columnName: "cost" },
    { name: "Code", columnName: "code" },
    { name: "Edit", columnName: "edit" },
];

const Stocks = () => {

    const [open, setOpen] = useState(false);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [stock, setStock] = useState<Stock | null>(null);
    const [id, setId] = useState<Number | null>(null);
    const [apriConferma, setApriConferma] = useState(false);
    const [search, setSearch] = useState('')

    const fetchStocks = async (value: string = '') => {

        const response = await fetch(`http://localhost:5000/stocks?q=${value}`);
        const responseJson = await response?.json();
        setStocks(responseJson);
    };

    useEffect(() => {

        fetchStocks();
    }, []);

    const handleEdit = (x: Stock) => {

        setStock(x)
        setOpen(true)
    }

    const handleClose = () => {

        setOpen(false);
        setStock(null);
    }

    const onClickNew = () => {

        setOpen(true);
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

        await fetch(`http://localhost:5000/stocks/${id}`, {
            method: "DELETE",
            headers: {

                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        await fetchStocks();
        return setApriConferma(false);
    }

    //////////////////////////////////////////////////////////////////////////////

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {

        const search = event.target.value;
        
        setSearch(search);
        fetchStocks(search);
    }

    return <div>
        <Button onClick={onClickNew}>New</Button>
        <Input label={""} onChange={handleChangeSearch} value={search}/> 
        <Form open={open} handleClose={handleClose} fetchStocks={fetchStocks} stock={stock}></Form>
        <ModuloConferma open={apriConferma} confermaChiusura={confermaChiusura} confermaCancellazione={confermaCancellazione}></ModuloConferma>
        <Table columns={COLUMNS} data={stocks} handleDelete={handleDelete} handleEdit={handleEdit}></Table>
    </div>
}

export default Stocks
