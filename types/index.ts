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
    icon?: string,
    image?: string,
    slug?: string,
    left_banner?: ICategoryLeftBanner[],
    top_banner?: ICategoryTopBanner[],
    children?: ICategory[],
    parentId?: string,
    brendId?: string,
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
            key: {
                uz: string,
                ru: string
            },
            value: {
                uz: string,
                ru: string
            }
        }
    ],
    orginal_price: number | null,
    sale_price: number | null,
    countInStock: number,
    parentCategory: string,
    subCategory: string,
    childCategory: string,
    shop?: string,
    images: string[],
    brend?: string,
    colors?: IColors[],
    size?: string[],
    country?: string,
    parent?: string

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


export interface IBrend {
    name: string,
    slug?: string
    title: {
        uz: string,
        ru: string
    },

    image?: {
        uz: string,
        ru: string
    },

    logo: string,

    discription: {
       uz: string,
       ru: string
    }
}