import { http, HttpResponse } from 'msw';
import { Vendor } from '../src/types/types';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

export const handlers = [
    http.post(REACT_APP_SERVER_URI + `/users/login`, ({ request, params, cookies }) => {
        let body = JSON.stringify({
            message: "Successfully authenticated user",
            userId: "MockUserId",
            firstName: "MockFirstName"
        });
        let responseCookies: string[] = [
            "selector=MockSelectorValue; HttpOnly; Secure; SameSite=None; MaxAge=9999999999999999;",
            "validator=MockValidatorValue; HttpOnly; Secure; SameSite=None; MaxAge=9999999999999999;",
        ];
        return new HttpResponse(body,
        {
            headers: {
                'Set-Cookie': responseCookies.join()
            },
            status: 201,
        });
    }),
    http.post(REACT_APP_SERVER_URI + `/users/logout`, ({ request, params, cookies }) => {
        let responseCookies: string[] = [
            "selector=; HttpOnly; Secure; SameSite=None; MaxAge=1;",
            "validator=; HttpOnly; Secure; SameSite=None; MaxAge=1;",
            "userId=; HttpOnly; Secure; SameSite=None; MaxAge=1;"
        ];

        return new HttpResponse(null,
        {
            headers: {
                'Set-Cookie': responseCookies.join()
            },
            status: 201,
        });
    }),
    http.post(REACT_APP_SERVER_URI + `/users/register`, ({}) => {
        let body = JSON.stringify({
            message: "Successfully authenticated user"
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.post(REACT_APP_SERVER_URI + '/users/registration/verify', ({}) => {
        let body = JSON.stringify({
            message: "Successfully authenticated user"
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.post(REACT_APP_SERVER_URI + '/users/registration/verify/new-token', ({}) => {
        return new HttpResponse(null, {
            status: 201
        });
    }),
    http.get(REACT_APP_SERVER_URI + `/users/:userId`, ({}) => {
        return HttpResponse.json({
            query: {
                businessName: "Handl"
            }
        });
    }),
    http.put(REACT_APP_SERVER_URI + `/users/:userId`, ({ request, params, cookies }) => {
        let body = JSON.stringify({
            message: "Successfully updated your info!"
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.put(REACT_APP_SERVER_URI + `/users/:userId/password`, ({ request, params, cookies }) => {
        let body = JSON.stringify({
            message: "Successfully updated your password."
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.post(REACT_APP_SERVER_URI + `/users/password/reset/request`, ({ request, params, cookies }) => {
        return new HttpResponse(null, {
            status: 201
        });
    }),
    http.get(REACT_APP_SERVER_URI + `/vendors/categories`, ({ request, params, cookies }) => {
        let categories: { category: string }[] = [];
        for (let i = 0; i < 50; i++)
          categories.push({ category: 'category' + i});
        let body = JSON.stringify({
            result: categories
        });
        return new HttpResponse(body, {
            status: 200
        });
    }),
    http.get(REACT_APP_SERVER_URI + `/vendors/subcategories`, ({ request, params, cookies }) => {
        let categories: { [subcategories: string]: string[] }[] = [
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Hats & Scarves",
                "Kids / Baby Footwear",
                "Men's Footwear",
                "Women's Footwear",
                "Women's Apparel",
                "Plus Size Clothing",
                "Jeans & Denim",
                "Childrens Clothing",
                "Urban Clothing",
                "Baby Clothes",
                "Bridal & Wedding",
                "Camouflage",
                "Formalwear",
                "Juniors",
                "Leather",
                "Leggings",
                "Licensed",
                "Lingerie",
                "Maternity",
                "Men's Apparel",
                "Outerwear",
                "Patriotic",
                "Scrubs & Medical",
                "Silk Screen, Embroidery & Decorated",
                "Sleepwear",
                "Socks & Hosiery",
                "Sportswear",
                "Sweatshirts",
                "Swimwear",
                "T-Shirts",
                "Underwear",
                "Vintage",
                "Work Clothing"
              ]
            },{
              "subcategories": [
                "Apparel",
                "Self-Defense & Security",
                "Baby Products",
                "Health, Beauty & Wellness",
                "Electronics",
                "Art & Supplies",
                "As Seen On TV",
                "Automotive",
                "Books & Magazines",
                "C-Store Items",
                "Cameras",
                "Candles, Incense, Potpourri",
                "Collectibles",
                "Computers",
                "Crafts",
                "Dollar Store",
                "Fashion Accessories",
                "Food & Grocery",
                "Footwear",
                "Garden & Lawn",
                "General Merchandise",
                "Gifts",
                "Handbags & Luggage",
                "Housewares",
                "Jewelry",
                "Knives",
                "Leather Goods",
                "Military Goods",
                "Novelties",
                "Office Supplies",
                "Party Supplies",
                "Perfume",
                "Pet Supplies",
                "Religious",
                "Smoking Products",
                "Sporting Goods",
                "Sunglasses & Eyewear",
                "Telephone, Cellular",
                "Tools",
                "Toys",
                "Watches"
              ]
            },
            {
              "subcategories": [
                "Mobile / Cellular",
                "Accessories",
                "Video Games",
                "Digital Cameras & Photography",
                "Car Electronics",
                "Batteries",
                "Home Entertainment",
                "MP3 / MP4"
              ]
            },
            {
              "subcategories": [
                "As Seen On TV",
                "Food & Grocery",
                "COVID-19 Supplies",
                "Apparel",
                "Tobacco & Smoking Products",
                "Art & Supplies",
                "Automotive",
                "Baby Products",
                "Books & Magazines",
                "Cameras",
                "Candles, Incense, Potpourri",
                "Collectibles",
                "Computers",
                "Crafts",
                "Dollar Store",
                "DVDs & Videos",
                "Electronics",
                "Fashion Accessories",
                "Gifts",
                "Handbags & Luggage",
                "Health, Beauty & Wellness",
                "Holiday & Seasonal",
                "Housewares",
                "Jewelry",
                "Knives",
                "Lawn & Garden",
                "Leather",
                "Military",
                "Music",
                "Novelties",
                "Office Supplies",
                "Party Items & Greeting Cards",
                "Patriotic Items",
                "Perfumes",
                "Pet Supplies",
                "Professional Supplies",
                "Promotional",
                "Regional & Ethnic",
                "Religious",
                "Self-Defense, Security",
                "Shoes & Footwear",
                "Sporting Goods",
                "Store Supplies",
                "Sunglasses & Eyewear",
                "Telephones, Cellular",
                "Tools & Hardware",
                "Toys, Games, Hobbies",
                "Travel",
                "Watches"
              ]
            },
            {
              "subcategories": [
                "General Gifts",
                "New Age",
                "Souvenirs",
                "Crystal",
                "General",
                "Wood",
                "Bags",
                "Boxes",
                "Brass",
                "China",
                "Engraving & Etching",
                "Figurines",
                "Glass",
                "Gourmet",
                "Magnets",
                "Nostalgic",
                "Patriotic",
                "Pewter",
                "Pottery & Ceramics",
                "Soaps & Bath Products",
                "Suncatchers",
                "Textiles"
              ]
            },
            {
              "subcategories": [
                "Safety Essentials",
                "Cosmetics",
                "CBD",
                "Skin Care",
                "Vitamins & Herbs",
                "Hair Products",
                "Aromatherapy",
                "First Aid",
                "Green Products",
                "Grooming Supplies",
                "Magnetic Therapy",
                "Natural & Holistic",
                "OTC Pharmaceuticals",
                "Skin Protection",
                "Spa Products",
                "Sports Nutrition",
                "Toiletries"
              ]
            },
            {
              "subcategories": [
                "Sterling Silver",
                "Fashion Jewelry",
                "Fine Jewelry",
                "Stainless Steel",
                "Diamonds",
                "African",
                "Antique",
                "Beads",
                "Body Jewelry",
                "Charms",
                "Cleaners, Supplies & Findings",
                "Collegiate Jewelry",
                "Costume Jewelry",
                "Crystal & Rhinestone",
                "Cubic Zirconia",
                "Displays, Packaging",
                "Gemstones",
                "Gold",
                "Hemp Jewelry",
                "Hip Hop",
                "Kids & Teens",
                "Magnetic Jewelry",
                "Mens Jewelry",
                "Native American",
                "New Age",
                "Patriotic",
                "Turquoise",
                "Western",
                "Watches"
              ]
            },
            {
              "subcategories": [
                "Clothing",
                "Health, Beauty & Wellness",
                "Home & Garden",
                "Pet Supplies",
                "Gifts",
                "Candles, Incense",
                "Fashion Accessories",
                "Greeting Cards",
                "Jewelry",
                "Novelties",
                "Smoking Products"
              ]
            },
            {
              "subcategories": [
                "Smoking Accessories",
                "Tobacco Products",
                "Lighters",
                "Electronic Cigarettes",
                "Disposable Electronic Cigarettes",
                "Hookahs"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Private Label Opportunities",
                "Distributorship Opportunities",
                "Manufacturers Seeking Reps",
                "Affiliate Programs",
                "Direct Sales & MLM"
              ]
            },
            {
              "subcategories": [
                "Logistics & Shipping",
                "Marketing Services",
                "Credit Card Services",
                "Internet Services",
                "Trade Shows",
                "Financial Services"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Candles",
                "Oil Burners",
                "Oils",
                "Incense",
                "Incense Holders",
                "Aromatherapy",
                "Candle Holders",
                "Potpourri"
              ]
            },
            {
              "subcategories": [
                "Kratom",
                "Oils",
                "Vape & Smoking",
                "Gummies and Edibles",
                "White/Private Label",
                "Flower",
                "Bath Products",
                "Creams, Lotions & Topicals",
                "Full Spectrum",
                "Made in USA",
                "Natural & Organic",
                "Pet Products",
                "Skin & Body Care",
                "Tinctures"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Sports Memorabilia",
                "Figurines",
                "Replica Models",
                "Licensed Items",
                "Patriotic",
                "General",
                "Military"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Craft Supplies",
                "Handicrafts",
                "Artificial Flowers"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Hats, Headwear",
                "Handbags",
                "Hair Accessories",
                "Jewelry",
                "Scarves",
                "Belts & Suspenders",
                "Bridal & Formal",
                "Gloves",
                "Kids & Teens",
                "Patches",
                "Rainwear, Umbrellas",
                "Sunglasses / Eyewear",
                "Ties, Neckwear",
                "Transfers, Appliques"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Fashion Handbags",
                "Luggage, Totes, Cases",
                "Wallets",
                "Backpacks"
              ]
            },
            {
              "subcategories": [
                "Christmas",
                "Halloween",
                "Beach Items",
                "Hanukkah"
              ]
            },
            {
              "subcategories": [
                "Floral",
                "Kitchenwares",
                "Furniture",
                "Decorative Accessories",
                "Small Appliances",
                "Cleaning Products",
                "Artificial Flowers",
                "Baskets",
                "Bed & Bath",
                "Clocks",
                "Dinnerware",
                "Lighting/LED",
                "Linens",
                "Rugs, Mats, Flooring",
                "Storage",
                "Textiles",
                "Wall Hangings",
                "Woodenware"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Accessories",
                "Biker",
                "Apparel"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Adult",
                "Licensed",
                "General",
                "Toys",
                "Flags, Banners, Ribbons",
                "Clothing",
                "Electronic",
                "Gags",
                "Glow",
                "Inflatables",
                "Jewelry",
                "Keyrings",
                "Laser Products",
                "Lighters",
                "Lighting/LED",
                "Magnets",
                "New Age",
                "Nostalgic",
                "Patriotic",
                "Photo",
                "Stickers & Signs",
                "Tattoos",
                "Wristbands"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Greeting Cards",
                "Gift Wrap & Gift Bags",
                "Costumes & Masks",
                "Balloons & Inflatables",
                "Wedding",
                "Decorations",
                "Holiday",
                "Paper, Plastic",
                "Party Favors"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Educational",
                "Tattoo & Piercing",
                "Barber & Beauty",
                "Medical",
                "Amusement & Carnival",
                "Bars & Clubs",
                "Casino",
                "Dental",
                "Entertainment",
                "Florist",
                "Hotel Supplies",
                "Janitorial",
                "Jeweler",
                "Optical",
                "Restaurant Supplies"
              ]
            },
            {
              "subcategories": [
                "Imprintables",
                "Fundraising Products",
                "Signage",
                "Green Products",
                "Premiums & Incentives"
              ]
            },
            {
              "subcategories": [
                "Mexican",
                "Latin American",
                "Southwest/Western",
                "Native American",
                "African",
                "Asian"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Socks, Hosiery"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Camping & Outdoors",
                "Licensed Products",
                "Hunting",
                "Athletic Apparel",
                "Skiing & Snow Sports",
                "Airsoft, Paintball",
                "Bags",
                "Equipment & Team Sports",
                "Fishing",
                "Fitness",
                "Martial Arts",
                "Recreational",
                "Scooters & Skateboards",
                "Water Sports"
              ]
            },
            {
              "subcategories": [
                "Packaging, Shipping",
                "Store Fixtures & Displays"
              ]
            },
            {
              "subcategories": [
                "Reading Glasses"
              ]
            },
            {
              "subcategories": []
            },
            {
              "subcategories": []
            },
            {
              "subcategories": [
                "Action Figures",
                "Licensed",
                "Collectible Toys",
                "Educational",
                "Games",
                "Animated Toys",
                "Arts & Crafts",
                "Baby Toys",
                "Battery Operated Toys",
                "Building Kits",
                "Carded / Peggable",
                "Cars, Trucks, Vehicles",
                "Doll Houses & Accessories",
                "Dolls",
                "Fads",
                "General Toys",
                "Hobbies",
                "Kites, Flying Toys",
                "Magic",
                "Models & Supplies",
                "Musical Toys",
                "Outdoor Toys",
                "Play Sets",
                "Plush Toys",
                "Puppets",
                "Puzzles",
                "Remote Control Toys",
                "Scooters & Riding Toys",
                "Trains",
                "Video Games",
                "Wooden Toys"
              ]
            },
            {
              "subcategories": []
            }
        ];
        
        let body = JSON.stringify({
            result: categories
        });
        return new HttpResponse(body, {
            status: 200
        });
    }),
    http.get(REACT_APP_SERVER_URI + `/vendors`, ({request, params, cookies}) => {
       let data: Vendor[] = [
        {
            "uuid": "a3a27978-b3d9-421b-9209-1915d44836ff",
            "name": "1 ST LH SUNGLASSES INC.",
            "description": "Wholesale sunglasses and sunglasses display www.glhsunglasses.com",
            "website": "http://www.glhsunglasses.com",
            "categories": "Sunglasses / Eyewear, General Merchandise, General Gifts",
            "people": ["Linda Li"],
            "address": "58-25 63RD STREET",
            "city": "Maspeth",
            "state": "NY",
            "zipcode": "11378",
            "phoneNumber": "(212)868-5656",
            "email": "info_1stlhsunglasses@yahoo.com",
        },
        {
            "uuid": "e8c9e3b4-a51d-4dac-9e59-27538210e270",
            "name": "26 California Wholesale",
            // eslint-disable-next-line
            "description": "26 California Wholesale has been one of the region's largest general merchandise importers and wholesalers. Decor, Kitchen, Pet, Garden, Party, Cleaning, Bath are some of our categories we supply for you including Bonita Home, Cali-Home, Promarx, Echols, Magic Cover and Con-Tact Brand products. We offer branded and non- branded goods at all incredible savings that translate to large profits for your company. Thank you for being the best part of 26 California Wholesale!",
            "website": "http://www.26CWS.com",
            "categories": "Baby / Kids Products, Dollar Store Items, General Gifts",
            "people": ["Lluis Portet", "Sandra Gomez"],
            "address": "2845 East 26th Street",
            "city": "Vernon",
            "state": "CA",
            "zipcode": "90058",
            "phoneNumber": "(323)588-3026",
            "email": "cs@26cws.com",
        },
        {
            "uuid": "8365e24d-554e-44ca-942e-b8f16511c0dc",
            "name": "2HOPE ACCESSORIES, INC",
            // eslint-disable-next-line
            "description": "Fashion Jewelry and Accessories! We also carry fashion jewelry for kids, a variety of fun novelty items and cosmetics!",
            "website": "http://www.twohopeaccessories.com",
            "categories": "Fashion Jewelry / Watches, Cosmetics / Nails / Hair Products, General Gifts",
            "people": ["Sylvia Kim"],
            "address": "55 Tec St",
            "city": "Hicksville",
            "state": "NY",
            "zipcode": "11801",
            "phoneNumber": "(631) 396-0877",
            "email": "",
        },
        {
            "uuid": "fc941d9f-9fe4-4444-aa88-3ee98ddb7e20",
            "name": "306 Deep Dead Sea Products",
            // eslint-disable-next-line
            "description": "Unleashing the Depths: The Power of the Dead Sea Waters.\nAt a staggering depth of 306 meters, the 306 Deep Dead Sea products brand echoes the untamed power that resides within the depths of the Dead Sea. As the exclusive distributor of Dead Sea raw materials in North America, we proudly stand as the fortress, relieving factories, labs, and all within the Dead Sea industry from the burdensome search for suppliers.\n306 Deep Dead Sea products, represents excellence and innovation in the industry. With unwavering dedication, we ensure uninterrupted access to the extraordinary Dead Sea raw materials, serving as the exclusive conduit for companies operating in Jordan.\nBy eliminating the complexities of sourcing and providing a seamless supply chain, we empower businesses across North America to unlock the true potential of the Dead Sea. Our products serve as a catalyst for innovation, enabling companies to create exceptional offerings that harness the unmatched benefits of this remarkable natural resource.\nThrough our extensive network and strategic partnerships, we guarantee reliable access to the Dead Sea raw materials, working closely with companies in Jordan. We take great pride in our role as the fortress, safeguarding the integrity and availability of these valuable resources.\nWith 306 Deep Dead Sea products brand, we stand as a beacon of reliability, trust, and unparalleled expertise in the North American market. Together, we can dive deep into the immense power of the Dead Sea and unlock a world of possibilities for businesses and consumers alike.",
            "website": "WWW.306DEEP.COM",
            "categories": "",
            "people": ["HIlal Rahal"],
            "address": "621 Consortium Court",
            "city": "London Ontario",
            "state": "N6E2S8, CA",
            "zipcode": "",
            "phoneNumber": "360-646-3360 ext 800",
            "email": "info@306deep.com",
        },
        {
            "uuid": "19b12923-d933-48c8-b4e1-c673498623bb",
            "name": "365 Fashions Inc.",
            // eslint-disable-next-line
            "description": "365 Fashions Inc. is an experienced Importer & Wholesaler of Sunglasses and Reading Glasses. It is in New York wholesale district for years. Our unique design and impressive quality have been helped so many customers to improve the business. 365 Fashions team has strong desire to assist the customer. Please feel free to explore the new styles at booth# N24116. 365 Fashions Inc. look forward to a successful working relationship with you in the future!",
            "website": "http://www.365fashions.com",
            "categories": "Sunglasses / Eyewear, General Merchandise, General Gifts, Souvenirs",
            "people": ["Yvonne Jin"],
            "address": "1710 Flashing Ave Ste 16",
            "city": "Ridgewood",
            "state": "NY",
            "zipcode": "11385",
            "phoneNumber": "(718) 576-3369",
            "email": "365fashions@gmail.com",
        },
        {
            "uuid": "14283187-6482-4c86-9777-86a6c5847182",
            "name": "5D Global Distributions LLC",
            // eslint-disable-next-line
            "description": "5D Global Distributions is a leading provider of comprehensive E-Commerce and Retail solutions tailored to businesses of all sizes. We specialize in offering a suite of services encompassing E-Commerce platform development, Retail, strategic marketing, streamlined supply chain management, and more. Our mission is to empower businesses to thrive in the dynamic online marketplace by providing innovative, scalable, and customizable solutions.",
            "website": "https://5dglobaldistributions.com/about-us-2/",
            "categories": "",
            "people": ["Monica Wells"],
            "address": "2917 Chalfont Ln",
            "city": "Plano",
            "state": "TX",
            "zipcode": "75023",
            "phoneNumber": "(972) 612-1222",
            "email": "www.globaladdistribution.com",
        },
        {
            "uuid": "19b7e23d-7f98-494f-801d-0d76c94ba886",
            "name": "7 Color Import Inc.",
            "description": "We carry trendy shoes, handbags, and accessories perfect for your stores!",
            "website": "http://www.7colorimport.com",
            "categories": "Handbags, Hats / Scarves, Women's Footwear",
            "people": ["Amy Lin"],
            "address": "1706 Flashing Ave",
            "city": "Queens",
            "state": "NY",
            "zipcode": "11385",
            "phoneNumber": "(347) 763-0627",
            "email": "amylincollection@gmail.com",
        },
        {

            "uuid": "b5d6da5b-9076-4a70-bc4e-5ef3f1e86fbf",
            "name": "7 STAR TRADING",
            "description": "Historically accurate chinese swords",
            "website": "www.sevenstarstrading.com",
            "categories": "General Merchandise",
            "people": ["Javid Sharifi"],
            "address": "3543 Marvin St",
            "city": "Annandale",
            "state": "VA",
            "zipcode": "22003",
            "phoneNumber": "(703) 573-2939",
            "email": "sevenstarstrading688@gmail.com",
        },
        {
            "uuid": "f634da5b-9076-4a70-bc4e-5ef3f1e86fb3",
            "name": "702AVE",
            "description": "Blank apparel wholesaler",
            "website": "https://702ave.com/",
            "categories": "Men's Apparel",
            "people": ["Huda Muwalla"],
            "address": "4685 Boulder Highway",
            "city": "Las Vegas",
            "state": "NV",
            "zipcode": "89121",
            "phoneNumber": "702-358-3882",
            "email": "Coming Soon",
        },
        {
            "uuid": "da5bda5b-9076-4a70-bc4e-5ef3f1e86fbf",
            "name": "79 South China Import",
            // eslint-disable-next-line
            "description": "Wholesale Sandals, Slippers, Aqua Shoes, Boots, Flip Flops and Footwear for over 43 years. Please visit our booth for Show Specials and great New styles. Established in 1979 in New York our history shows our commitment in specializing in footwear for all our customers. Best Prices and Quality,New styles with Great ROI for your stores. We are a dependable footwear source that carries items in Stock and ship out the same/next business day. Please visit or website for www.southchinaimport.com and our booth for all our inventory.",
            "website": "http://www.southchinaimport.com",
            // eslint-disable-next-line
            "categories": "Swimwear, Kids / Baby Footwear, Men's Footwear, Women's Footwear, Closeouts / Liquidation",
            "people": ["Samuel Wong", "Bobby Cheung"],
            "address": "28 Williams St",
            "city": "Lynbrook",
            "state": "NY",
            "zipcode": "11563",
            "phoneNumber": "718) 389-6731",
            "email": "sochinany@yahoo.com",
        },
       ]
        let body = JSON.stringify({
            result: data
       });
       return new HttpResponse(body, {
            status: 200
       }); 
    }),
    http.post(REACT_APP_SERVER_URI + `/users/contact`, ({request, params, cookies}) => {
        return new HttpResponse(null, {
            status: 201
        });
    })
];