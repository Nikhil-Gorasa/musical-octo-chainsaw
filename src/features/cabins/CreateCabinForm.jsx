import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	console.log("While Starting - ", cabinToEdit);
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);
	console.log("IsEdit Status : ", isEditSession);
	console.log("The Edit data : ", editValues);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin();

	const { isEditing, editCabin } = useEditCabin();

	function onSubmit(data) {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];
		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						console.log(data);
						reset();
					},
				},
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
					},
				},
			);

		onCloseModal((state) => !state);
	}
	const isWorking = isCreating || isEditing;

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be atleast one",
						},
					})}
				/>
			</FormRow>

			<FormRow label="regularPrice" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be atleast one",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register("discount", {
						required: "This field is required",
						validate: (value) => {
							return (
								+value <= +getValues().regularPrice ||
								"Discount should be less than regular price"
							);
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}>
				<Textarea
					disabled={isWorking}
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="image">
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					disabled={isWorking}
					{...register("image", {
						required: isEditSession
							? false
							: "Please Upload a image",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal((state) => !state)}>
					Cancel
				</Button>

				<Button>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
