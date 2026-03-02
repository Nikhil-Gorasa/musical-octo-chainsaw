import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { getSettings, updateSetting } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

function UpdateSettingsForm() {
	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery({
		queryFn: getSettings,
		queryKey: ["settings"],
	});
	console.log("Data in fetching -", data);

	const { isLoading: isUpdating, mutate } = useMutation({
		mutationFn: updateSetting,
		// mutationKey: ["settings"],
		onSuccess: () => {
			toast.success("Settings Updated");
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
	});

	const {
		minBookingLength,
		maxBookingLength,
		maxGuestsPerBooking,
		BreakfastPrice,
	} = data || {};

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value) return;
		mutate({ [field]: value });
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={BreakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "BreakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
