import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");
	if (error) {
		console.log(error);
		throw new Error("Cabins could not be loaded.");
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.log(error);
		throw new Error("Cabins could not be deleted.");
	}

	return data;
}

// ! ADDS AND ALSO EDITS THE CABIN DATA

export async function addCabin(newCabin, id) {
	// 1️⃣ Check if image is already a Supabase URL (edit case)
	const hasImagePath =
		typeof newCabin.image === "string" &&
		newCabin.image.startsWith(supabaseUrl);

	// 2️⃣ Generate image name ONLY if new file is uploaded
	const imageName = hasImagePath
		? null
		: `${Math.random()}-${newCabin.image.name}`.replaceAll(/[/.]/g, "");

	// 3️⃣ Final image path
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 4️⃣ Build Supabase query
	let query = supabase.from("cabins");

	// CREATE
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// EDIT
	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	}

	// 5️⃣ Execute DB query
	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be saved");
	}

	// 6️⃣ Upload image ONLY if a new file was selected
	if (hasImagePath) return data;
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// Rollback ONLY on CREATE
	if (storageError) {
		if (!id) {
			await supabase.from("cabins").delete().eq("id", data.id);
		}
		console.error(storageError);
		throw new Error("Image upload failed");
	}

	return data;
}
