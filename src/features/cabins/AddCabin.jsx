import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add new Cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<>
// 			<Button onClick={() => setIsOpenModal((show) => !show)}>
// 				Add new Cabin
// 			</Button>
// 			{isOpenModal && (
// 				<Modal setIsOpenModal={setIsOpenModal}>
// 					<CreateCabinForm onCloseModal={setIsOpenModal} />
// 				</Modal>
// 			)}
// 		</>
// 	);
// }

export default AddCabin;
