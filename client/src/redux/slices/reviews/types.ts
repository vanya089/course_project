

export type ReviewType = {
    _id: string,
    title: string,
    description: string,
    year: number,
    genre: string,
    imageUrl: string,
}


export interface ReviewState {
    reviews: ReviewType[],
    status: Status,
    error: string | null,
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}