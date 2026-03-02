import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: addCabin,
		onSuccess: () => {
			toast.success("Cabin Added Sucessfully");
			queryClient.invalidateQueries(["cabins"]);
		},
		onError: () => {
			toast.error("Unable to add cabin");
		},
	});
	return { isCreating, createCabin };
}
