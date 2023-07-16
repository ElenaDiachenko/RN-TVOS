export type MovieDataType = {
    data: Movie[];
    currentPage: number;
    totalPages: number;
};

export type Movie = {
    _id: string;
    title: string;
    releaseDate: number;
    duration: number;
    rating: number;
    desc: string;
    poster: string[];
    genres: string[];
    casts: string[];
    videos: string[] | [];
};

export type UserType = {
    username: string;
    token: string;
};

export type SignupData = {
    username: string;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};
