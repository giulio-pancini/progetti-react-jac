import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal"
import { Customer } from "../../../utils/models";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    open: boolean;
    handleClose: () => void
    fetchCustomers: () => void
    customer: Customer | null
}

const Form = ({ open, handleClose, fetchCustomers, customer }: Props) => {

    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState("");

    const [vatNumber, setVatNumber] = useState("");
    const [vatNumberError, setVatNumberError] = useState("");


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const name = event.target.name;
        const value = event.target.value;

        if (name === "fullName") {
            return setFullName(value);
        }
        if (name === "vatNumber") {
            return setVatNumber(value);
        }
        if (name === "city") {
            return setCity(value);
        }
    }

    const handleReset = () => {

        setFullName("");
        setFullNameError("");

        setVatNumber("");
        setVatNumberError("");

        setCity("");
        setCityError("");
    };

    const handleSave = async () => {

        if (!fullName.length) {

            setFullNameError("Campo obbligatorio");
        }
        if (!vatNumber.length) {

            setVatNumberError("Campo obbligatorio");
        }
        if (!city.length) {

            setCityError("Campo obbligatorio");
        }
        if (!fullName.length || !vatNumber.length || !city.length) {

            return null;
        }

        const headers = { Accept: "application/json", "Content-Type": "application/json" };
        const body = JSON.stringify({ fullName, vatNumber, city });

        if (customer?.id) {

            await fetch(`http://localhost:5000/customers/${customer?.id}`, {
                method: "PATCH",
                headers,
                body,
            });

            fetchCustomers();
            handleReset();
            return handleClose();
        }

        await fetch("http://localhost:5000/customers", {
            method: "POST",
            headers,
            body,
        });

        fetchCustomers();
        handleReset();
        handleClose();
    };

    useEffect(() => {

        if (customer) {

          setFullName(customer.fullName);
          setVatNumber(customer.vatNumber);
          setCity(customer.city)
        }
        if (!customer) {
            
          handleReset();
        }
      }, [customer]);

    return <div>
        <Modal show={open}>
            <Input
                name="fullName"
                label="Full Name"
                type="text"
                onChange={handleChange}
                value={fullName}
                error={fullNameError}
            />
            <Input
                name="city"
                label="City"
                type="text"
                onChange={handleChange}
                value={city}
                error={cityError}
            />
            <Input
                name="vatNumber"
                label="Vat Number"
                type="text"
                onChange={handleChange}
                value={vatNumber}
                error={vatNumberError}
            />
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSave}>Salva</Button>
        </Modal>
    </div>
}

export default Form