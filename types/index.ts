interface ICategoryTopBanner {
    image: {
        uz: string,
        ru: string,
    },
    slug: string 
}

interface ICategoryLeftBanner {
    image: {
        uz: string,
        ru: string,
    },
    slug: string 
}

export interface ICategory {
    _id?: string,
    name: {
        uz: string,
        ru: string
    },
    image?: string,
    icon?: string,
    slug?: string,
    left_banner?: ICategoryLeftBanner[],
    top_banner?: ICategoryTopBanner[],
    children?: ICategory[],
    parentId?: string,
    updatedAt?: string,
    createdAt?: string


}


interface IColors {
    name: string,
    code: string,
    images: string[]
}

export interface IProduct {
    name: {
        uz: string,
        ru: string
    },
    discription: {
        uz: string,
        ru: string
    },
    properteis?: [
        {
            uz: string,
            ru: string
        }
    ],
    isPropery: boolean,
    price: number,
    countInStock: number,
    parentCategory: string,
    subCategory: string,
    childCategory: string,
    shop?: string,
    images: string[],
    brend?: string,
    colors?: IColors[],
    size?: string[],
    discount?: number,
    isDiscount: boolean,
    country?: string

};


export interface ICart {
    product: {
        color?: {
            name: string,
            code?: string,
            images?: string[]
        },
        size?: string,
        memory?: string,
        quantity: number,
    },

}

export interface IShop {
    name: string,
    slug?: string,
    discription: {
        uz: string,
        ru: string
    },
    image?: string,
    bannerImage?: string,
    owner?: string
}



export interface ICarousel {

    image: {
        uz: string,
        ru: string
    },
    slug: string

}