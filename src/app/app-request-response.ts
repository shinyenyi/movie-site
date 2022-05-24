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

export class BookMarkedMovie {

    constructor(
        public id?: string,
        public title?: string,
        public originalTitle?: string,
        public fullTitle?: string,
        public type?: string,
        public year?: string,
        public image?: string,
        public releaseDate?: string,
        public runtimeMins?: string,
        public runtimeStr?: string,
        public plot?: string,
        public plotLocal?: string,
        public plotLocalIsRtl?: boolean,
        public awards?: string,
        public directors?: string,
        public directorList?:DirectorList[],
        public writers?: string,
        public writerList?: WriterList[],
        public stars?: string,
        public starList?: StarList[],
        public actorList?:ActorList[],
        public fullCast?: string,
        public genres?: string,
        public genreList?: GenreList[],
        public companies?: string,
        public companyList?: CompanyList[],
        public countries?: string,
        public countryList?: CountryList[],
        public languages?: string,
        public languageList?:LanguageList[],
        public contentRating?: string,
        public imDbRating?: string,
        public imDbRatingVotes?: string,
        public metacriticRating?: string,
        public ratings?: string,
        public wikipedia?: string,
        public posters?: string,
        public images?: string,
        public trailer?: string,
        public boxOffice?: BoxOffice,
        public tagline?: string,
        public keywords?: string,
        public keywordList?: string[],
        public similars?: Similars[],
        public tvSeriesInfo?: string,
        public tvEpisodeInfo?:string,
        public errorMessage?:string,
        public bookMarked?:boolean
    ) { }
}

export class DirectorList {

    constructor(
        public id: string,
        public name: string
    ) { }
}

export class WriterList {

    constructor(
        public id: string,
        public name: string
    ) { }
}

export class ActorList {

    constructor(
        public id: string,
        public image: string,
        public name: string,
        public asCharacter: string,
    ) { }
}

export class CompanyList {

    constructor(
        public id: string,
        public name: string
    ) { }
}

export class CountryList {

    constructor(
        public key: string,
        public value: string
    ) { }
}

export class LanguageList {

    constructor(
        public key: string,
        public value: string
    ) { }
}

export class BoxOffice {

    constructor(
        public budget: string,
        public openingWeekendUSA: string,
        public grossUSA: string,
        public cumulativeWorldwideGross: string,
    ) { }
}

export class Similars {

    constructor(
        public id: string,
        public title:string,
        public image: string,
        public imDbRating: string
    ) { }
}