import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { addCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;
	console.log(errors);
	const queryClient = useQueryClient();

	function onSubmit(data) {
		console.log(data);
		mutate({ ...data, image: data.image[0] });
	}

	const { mutate, isLoading: isSubmitting } = useMutation({
		mutationFn: addCabin,
		onSuccess: () => {
			toast.success("Cabin Added Sucessfully");
			queryClient.invalidateQueries(["cabins"]);
			reset();
		},
		onError: () => {
			toast.error("Unable to add cabin");
		},
	});

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isSubmitting}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isSubmitting}
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
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
					disabled={isSubmitting}
					{...register("image", {
						required: "Please Upload a image",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
