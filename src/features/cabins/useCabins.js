import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { toast } from "react-hot-toast";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});

	if (error) {
		toast.error("Unable to fetch the cabin data");
	}

	return { isLoading, cabins };
}
