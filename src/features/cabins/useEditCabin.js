import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => addCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin Edited Sucessfully");
			queryClient.invalidateQueries(["cabins"]);
		},
		onError: () => {
			toast.error("Unable to add cabin");
		},
	});

	return { isEditing, editCabin };
}
