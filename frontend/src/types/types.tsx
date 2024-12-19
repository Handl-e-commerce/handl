export type Vendor = {
    uuid: string;
    name: string;
    description: string;
    website: string;
    categories: string;
    people: string[];
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
};

export type Order = 'asc' | 'desc';