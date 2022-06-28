export class MovieData {

    constructor(
        public response: Response,
        public results: Movie[]
    ) { }
}

export class Response {

    constructor(
        public errorMessage: string,
        public queryString: string,
    ) { }
}

export class Movie {

    constructor(
        public id: string,
        public image: string,
        public title: string,
        public description: string,
        public runtimeStr: string,
        public genres: string,
        public genreList: GenreList[],
        public contentRating: string,
        public imDbRating: string,
        public imDbRatingVotes: string,
        public metacriticRating: string,
        public plot: string,
        public stars: string,
        public starList: StarList[],
        public bookMarked:boolean
    ) { }
}

export class GenreList {

    constructor(
        public key: string,
        public value: string
    ) { }
}

export class StarList {

    constructor(
        public id: string,
        public name: string
    ) { }
}