import Button from "../../../components/Button"
import Input from "../../../components/Input"
import Modal from "../../../components/Modal"
import { Stock } from "../../../utils/models"
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    open: boolean
    handleClose: () => void
    fetchStocks: () => void
    stock: Stock | null
}

const Form = ({ open, handleClose, fetchStocks, stock }: Props) => {

    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const [cost, setCost] = useState<Number>(0);
    const [costError, setCostError] = useState("");

    const [code, setCode] = useState<Number>(0);
    const [codeError, setCodeError] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const name = event.target.name;
        const value = event.target.value;

        if (name === "description") {
            return setDescription(value);
        }
        if (name === "cost") {
            return setCost(parseFloat(value));
        }
        if (name === "code") {
            return setCode(parseInt(value));
        }
    }

    const handleReset = () => {

        setDescription("");
        setDescriptionError("");

        setCost(0);
        setCostError("");

        setCode(0);
        setCodeError("");
    };

    const handleSave = async () => {

        if (!description.length) {

            setDescriptionError("Campo obbligatorio");
        }
        if (!cost) {

            setCostError("Campo obbligatorio");
        }
        if (cost == 0) {
            setCostError("Il valore inserito non può essere zero")
        }
        if (!code) {

            setCodeError("Campo obbligatorio");
        }
        if(code == 0) {

            setCodeError("Il valore inserito non può essere zero")
        }
        if (!description.length || !cost || !code) {

            return null;
        }

        const headers = { Accept: "application/json", "Content-Type": "application/json" };
        const body = JSON.stringify({ description, cost, code });

        if (stock?.id) {

            await fetch(`http://localhost:5000/stocks/${stock?.id}`, {
                method: "PATCH",
                headers,
                body,
            });

            fetchStocks();
            handleReset();
            return handleClose();
        }

        await fetch("http://localhost:5000/stocks", {
            method: "POST",
            headers,
            body,
        });

        fetchStocks();
        handleReset();
        handleClose();
    };

    useEffect(() => {

        if (stock) {

            setDescription(stock.description);
            setCost(stock.cost);
            setCode(stock.code)
        }
        if (!stock) {

            handleReset();
        }
    }, [stock]);

    return <div>
        <Modal show={open}>
            <Input
                name="description"
                label="Description"
                type="text"
                onChange={handleChange}
                value={description}
                error={descriptionError}
            />
            <Input
                name="cost"
                label="Cost"
                type="number"
                onChange={handleChange}
                value={cost?.toString()}
                error={costError}
            />
            <Input
                name="code"
                label="Code"
                type="number"
                onChange={handleChange}
                value={code?.toString()}
                error={codeError}
            />
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSave}>Salva</Button>
        </Modal>
    </div>
}

export default Form