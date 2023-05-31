import Modal from "../Modal";
import Button from "../Button";

interface Props {
    open: boolean
    confermaChiusura: () => void
    confermaCancellazione: () => void
}

const ModuloConferma = ( { open, confermaChiusura, confermaCancellazione }: Props) => {

    return <div>
        <Modal show={open}>
        <div>Are you sure you want to delete this?</div>
        <Button onClick={confermaChiusura}>Close</Button>
        <Button onClick={confermaCancellazione}>Delete</Button>
        </Modal>
    </div>
}

export default ModuloConferma