import type { QueryResponse } from './types';
import { searchQuery } from './stores/searchQuery';

const API_KEY = import.meta.env.VITE_API_KEY
let imagesFetched = 0;
let q: string;
searchQuery.subscribe((value) => {
	q = value;
	imagesFetched = 0;
});

export const fetchPhotos = async ({ pageParam = 1 }) => {
	let response = (await (
		await fetch(
			`https://pixabay.com/api/?key=${API_KEY}&safesearch=true&q=${q}&page=${pageParam}`
		)
	).json()) as QueryResponse;
	imagesFetched += 20;
	let hasNextPage = true;
	if (response.hits.length < 20 || imagesFetched >= 500) {
		hasNextPage = false;
		imagesFetched = 0;
	}
	return { ...response, nextPage: hasNextPage ? pageParam + 1 : undefined };
};
