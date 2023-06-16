import { IAPIResponse } from '../types/types';

export async function fetchMovies(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Something went wrong during fetching!');
    }

    const data: IAPIResponse = await res.json();

    if (data.Error) {
      throw new Error(data.Error);
    }

    if (data.Search) {
      return data.Search;
    }
  } catch (err) {
    throw err;
  }
}
