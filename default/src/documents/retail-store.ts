export const company = {
  "name": "GlobalMart Retail",
  "founded": 1995,
  "headquarters": "Chicago, IL",
  "employees": 5280,
  "annual_revenue": "$789 million"
}

export const products = [
  {
    "id": "P001",
    "name": "Ultra HD Smart TV",
    "category": "Electronics",
    "price": 899.99,
    "description": "55-inch Ultra HD Smart TV with voice control and streaming capabilities",
    "manufacturer": "TechVision",
    "stock_quantity": 124,
    "tags": ["television", "smart home", "entertainment"],
    "rating": 4.7,
    "reviews_count": 358
  },
  {
    "id": "P002",
    "name": "Ergonomic Office Chair",
    "category": "Furniture",
    "price": 249.99,
    "description": "Adjustable ergonomic office chair with lumbar support and breathable mesh",
    "manufacturer": "ComfortPlus",
    "stock_quantity": 75,
    "tags": ["office", "furniture", "ergonomic"],
    "rating": 4.3,
    "reviews_count": 217
  },
  {
    "id": "P003",
    "name": "Wireless Bluetooth Headphones",
    "category": "Electronics",
    "price": 129.99,
    "description": "Noise-cancelling wireless headphones with 30-hour battery life",
    "manufacturer": "SoundWave",
    "stock_quantity": 208,
    "tags": ["audio", "wireless", "accessories"],
    "rating": 4.6,
    "reviews_count": 492
  },
  {
    "id": "P004",
    "name": "Stainless Steel Cookware Set",
    "category": "Kitchen",
    "price": 189.99,
    "description": "10-piece stainless steel cookware set with non-stick coating",
    "manufacturer": "CulinartPro",
    "stock_quantity": 42,
    "tags": ["kitchen", "cooking", "homeware"],
    "rating": 4.8,
    "reviews_count": 176
  },
  {
    "id": "P005",
    "name": "Premium Cotton Bedding Set",
    "category": "Home",
    "price": 79.99,
    "description": "Luxury 100% cotton bedding set with duvet cover and pillowcases",
    "manufacturer": "SleepLuxe",
    "stock_quantity": 93,
    "tags": ["bedroom", "home", "comfort"],
    "rating": 4.5,
    "reviews_count": 231
  }
]


export const customers = [
  {
    "id": "C001",
    "first_name": "Jennifer",
    "last_name": "Rodriguez",
    "email": "jrodriguez@example.com",
    "phone": "555-123-4567",
    "address": {
      "street": "872 Maple Avenue",
      "city": "Austin",
      "state": "TX",
      "zip": "78701"
    },
    "loyalty_points": 345,
    "registration_date": "2021-03-15",
    "purchase_history": ["O001", "O008", "O012"]
  },
  {
    "id": "C002",
    "first_name": "Michael",
    "last_name": "Chen",
    "email": "mchen@example.com",
    "phone": "555-987-6543",
    "address": {
      "street": "415 Oak Street",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "loyalty_points": 520,
    "registration_date": "2020-07-22",
    "purchase_history": ["O002", "O009"]
  },
  {
    "id": "C003",
    "first_name": "Sarah",
    "last_name": "Johnson",
    "email": "sjohnson@example.com",
    "phone": "555-456-7890",
    "address": {
      "street": "1234 Pine Road",
      "city": "Denver",
      "state": "CO",
      "zip": "80202"
    },
    "loyalty_points": 185,
    "registration_date": "2022-01-10",
    "purchase_history": ["O003", "O011"]
  },
  {
    "id": "C004",
    "first_name": "David",
    "last_name": "Williams",
    "email": "dwilliams@example.com",
    "phone": "555-789-0123",
    "address": {
      "street": "567 Cedar Lane",
      "city": "Atlanta",
      "state": "GA",
      "zip": "30301"
    },
    "loyalty_points": 410,
    "registration_date": "2021-05-18",
    "purchase_history": ["O004", "O007"]
  },
  {
    "id": "C005",
    "first_name": "Emily",
    "last_name": "Taylor",
    "email": "etaylor@example.com",
    "phone": "555-234-5678",
    "address": {
      "street": "789 Birch Boulevard",
      "city": "Chicago",
      "state": "IL",
      "zip": "60601"
    },
    "loyalty_points": 275,
    "registration_date": "2020-11-05",
    "purchase_history": ["O005", "O010"]
  }
]


export const orders = [
  {
    "id": "O001",
    "customer_id": "C001",
    "date": "2023-11-15T09:30:00Z",
    "status": "delivered",
    "items": [
      {
        "product_id": "P003",
        "quantity": 1,
        "price_at_purchase": 129.99
      },
      {
        "product_id": "P005",
        "quantity": 2,
        "price_at_purchase": 79.99
      }
    ],
    "total_amount": 289.97,
    "payment_method": "credit_card",
    "shipping_address": {
      "street": "872 Maple Avenue",
      "city": "Austin",
      "state": "TX",
      "zip": "78701"
    },
    "tracking_number": "TRK789012345"
  },
  {
    "id": "O002",
    "customer_id": "C002",
    "date": "2023-12-03T14:45:00Z",
    "status": "delivered",
    "items": [
      {
        "product_id": "P001",
        "quantity": 1,
        "price_at_purchase": 899.99
      }
    ],
    "total_amount": 899.99,
    "payment_method": "paypal",
    "shipping_address": {
      "street": "415 Oak Street",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "tracking_number": "TRK123456789"
  },
  {
    "id": "O003",
    "customer_id": "C003",
    "date": "2024-01-22T11:15:00Z",
    "status": "shipped",
    "items": [
      {
        "product_id": "P002",
        "quantity": 1,
        "price_at_purchase": 249.99
      },
      {
        "product_id": "P004",
        "quantity": 1,
        "price_at_purchase": 189.99
      }
    ],
    "total_amount": 439.98,
    "payment_method": "credit_card",
    "shipping_address": {
      "street": "1234 Pine Road",
      "city": "Denver",
      "state": "CO",
      "zip": "80202"
    },
    "tracking_number": "TRK456789012"
  },
  {
    "id": "O004",
    "customer_id": "C004",
    "date": "2024-02-10T16:20:00Z",
    "status": "delivered",
    "items": [
      {
        "product_id": "P005",
        "quantity": 3,
        "price_at_purchase": 79.99
      }
    ],
    "total_amount": 239.97,
    "payment_method": "debit_card",
    "shipping_address": {
      "street": "567 Cedar Lane",
      "city": "Atlanta",
      "state": "GA",
      "zip": "30301"
    },
    "tracking_number": "TRK890123456"
  },
  {
    "id": "O005",
    "customer_id": "C005",
    "date": "2024-03-05T10:50:00Z",
    "status": "processing",
    "items": [
      {
        "product_id": "P001",
        "quantity": 1,
        "price_at_purchase": 899.99
      },
      {
        "product_id": "P003",
        "quantity": 1,
        "price_at_purchase": 129.99
      }
    ],
    "total_amount": 1029.98,
    "payment_method": "credit_card",
    "shipping_address": {
      "street": "789 Birch Boulevard",
      "city": "Chicago",
      "state": "IL",
      "zip": "60601"
    },
    "tracking_number": null
  }
]

export const stores = [
  {
    "id": "S001",
    "name": "GlobalMart Chicago Downtown",
    "type": "flagship",
    "address": {
      "street": "123 Michigan Avenue",
      "city": "Chicago",
      "state": "IL",
      "zip": "60601"
    },
    "phone": "555-111-2222",
    "hours": {
      "monday": "9:00-21:00",
      "tuesday": "9:00-21:00",
      "wednesday": "9:00-21:00",
      "thursday": "9:00-21:00",
      "friday": "9:00-22:00",
      "saturday": "10:00-22:00",
      "sunday": "11:00-19:00"
    },
    "manager": "Lisa Thompson",
    "staff_count": 45,
    "square_footage": 25000
  },
  {
    "id": "S002",
    "name": "GlobalMart Seattle Central",
    "type": "standard",
    "address": {
      "street": "456 Pine Street",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "phone": "555-333-4444",
    "hours": {
      "monday": "9:00-20:00",
      "tuesday": "9:00-20:00",
      "wednesday": "9:00-20:00",
      "thursday": "9:00-20:00",
      "friday": "9:00-21:00",
      "saturday": "10:00-21:00",
      "sunday": "11:00-18:00"
    },
    "manager": "Robert Chen",
    "staff_count": 32,
    "square_footage": 18000
  },
  {
    "id": "S003",
    "name": "GlobalMart Austin South",
    "type": "standard",
    "address": {
      "street": "789 Congress Avenue",
      "city": "Austin",
      "state": "TX",
      "zip": "78701"
    },
    "phone": "555-555-6666",
    "hours": {
      "monday": "9:00-20:00",
      "tuesday": "9:00-20:00",
      "wednesday": "9:00-20:00",
      "thursday": "9:00-20:00",
      "friday": "9:00-21:00",
      "saturday": "10:00-21:00",
      "sunday": "11:00-18:00"
    },
    "manager": "Amanda Rodriguez",
    "staff_count": 28,
    "square_footage": 15000
  },
  {
    "id": "S004",
    "name": "GlobalMart Denver West",
    "type": "express",
    "address": {
      "street": "101 Mountain View Road",
      "city": "Denver",
      "state": "CO",
      "zip": "80202"
    },
    "phone": "555-777-8888",
    "hours": {
      "monday": "8:00-22:00",
      "tuesday": "8:00-22:00",
      "wednesday": "8:00-22:00",
      "thursday": "8:00-22:00",
      "friday": "8:00-22:00",
      "saturday": "8:00-22:00",
      "sunday": "9:00-21:00"
    },
    "manager": "Jason Miller",
    "staff_count": 18,
    "square_footage": 8500
  },
  {
    "id": "S005",
    "name": "GlobalMart Atlanta Midtown",
    "type": "standard",
    "address": {
      "street": "222 Peachtree Street",
      "city": "Atlanta",
      "state": "GA",
      "zip": "30301"
    },
    "phone": "555-999-0000",
    "hours": {
      "monday": "9:00-20:00",
      "tuesday": "9:00-20:00",
      "wednesday": "9:00-20:00",
      "thursday": "9:00-20:00",
      "friday": "9:00-21:00",
      "saturday": "10:00-21:00",
      "sunday": "11:00-18:00"
    },
    "manager": "Tanya Washington",
    "staff_count": 30,
    "square_footage": 17000
  }
]

export const inventory = [
  {
    "store_id": "S001",
    "products": [
      { "product_id": "P001", "quantity": 35 },
      { "product_id": "P002", "quantity": 22 },
      { "product_id": "P003", "quantity": 58 },
      { "product_id": "P004", "quantity": 12 },
      { "product_id": "P005", "quantity": 27 }
    ],
    "last_updated": "2024-04-01T08:00:00Z"
  },
  {
    "store_id": "S002",
    "products": [
      { "product_id": "P001", "quantity": 28 },
      { "product_id": "P002", "quantity": 16 },
      { "product_id": "P003", "quantity": 45 },
      { "product_id": "P004", "quantity": 9 },
      { "product_id": "P005", "quantity": 21 }
    ],
    "last_updated": "2024-04-01T08:15:00Z"
  },
  {
    "store_id": "S003",
    "products": [
      { "product_id": "P001", "quantity": 22 },
      { "product_id": "P002", "quantity": 14 },
      { "product_id": "P003", "quantity": 38 },
      { "product_id": "P004", "quantity": 8 },
      { "product_id": "P005", "quantity": 18 }
    ],
    "last_updated": "2024-04-01T08:30:00Z"
  },
  {
    "store_id": "S004",
    "products": [
      { "product_id": "P001", "quantity": 15 },
      { "product_id": "P002", "quantity": 10 },
      { "product_id": "P003", "quantity": 32 },
      { "product_id": "P004", "quantity": 6 },
      { "product_id": "P005", "quantity": 12 }
    ],
    "last_updated": "2024-04-01T08:45:00Z"
  },
  {
    "store_id": "S005",
    "products": [
      { "product_id": "P001", "quantity": 24 },
      { "product_id": "P002", "quantity": 13 },
      { "product_id": "P003", "quantity": 35 },
      { "product_id": "P004", "quantity": 7 },
      { "product_id": "P005", "quantity": 15 }
    ],
    "last_updated": "2024-04-01T09:00:00Z"
  }
]


export const promotions = [
  {
    "id": "PROMO001",
    "name": "Spring Sale",
    "description": "Up to 30% off selected home and garden items",
    "start_date": "2024-04-01T00:00:00Z",
    "end_date": "2024-04-15T23:59:59Z",
    "discount_type": "percentage",
    "discount_value": 30,
    "applicable_categories": ["Home", "Kitchen"],
    "minimum_purchase": 100,
    "coupon_code": "SPRING30"
  },
  {
    "id": "PROMO002",
    "name": "Tech Tuesday",
    "description": "15% off all electronics every Tuesday",
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-12-31T23:59:59Z",
    "discount_type": "percentage",
    "discount_value": 15,
    "applicable_categories": ["Electronics"],
    "minimum_purchase": 0,
    "coupon_code": "TECHTUESDAY"
  },
  {
    "id": "PROMO003",
    "name": "New Customer Discount",
    "description": "$20 off your first purchase of $100 or more",
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-12-31T23:59:59Z",
    "discount_type": "fixed",
    "discount_value": 20,
    "applicable_categories": ["All"],
    "minimum_purchase": 100,
    "coupon_code": "WELCOME20"
  }
]

export const categories = [
  {
    "id": "CAT001",
    "name": "Electronics",
    "description": "Electronic devices and accessories",
    "parent_category": null,
    "subcategories": ["Televisions", "Audio", "Computers", "Mobile Phones"]
  },
  {
    "id": "CAT002",
    "name": "Furniture",
    "description": "Home and office furniture",
    "parent_category": null,
    "subcategories": ["Living Room", "Dining Room", "Bedroom", "Office"]
  },
  {
    "id": "CAT003",
    "name": "Kitchen",
    "description": "Kitchen appliances and cookware",
    "parent_category": null,
    "subcategories": ["Appliances", "Cookware", "Utensils", "Tableware"]
  },
  {
    "id": "CAT004",
    "name": "Home",
    "description": "Home decor and essentials",
    "parent_category": null,
    "subcategories": ["Bedding", "Bath", "Decor", "Storage"]
  }
]

export const reviews = [
  {
    "id": "R001",
    "product_id": "P001",
    "customer_id": "C002",
    "rating": 5,
    "title": "Excellent picture quality",
    "comment": "The picture quality on this TV is amazing. Crystal clear even in bright rooms.",
    "date": "2023-12-10T16:25:00Z",
    "verified_purchase": true
  },
  {
    "id": "R002",
    "product_id": "P003",
    "customer_id": "C001",
    "rating": 4,
    "title": "Great sound, battery could be better",
    "comment": "These headphones have excellent sound quality but the battery life isn't quite as long as advertised.",
    "date": "2023-11-20T14:10:00Z",
    "verified_purchase": true
  },
  {
    "id": "R003",
    "product_id": "P004",
    "customer_id": "C003",
    "rating": 5,
    "title": "Professional quality cookware",
    "comment": "This cookware set is fantastic. Heats evenly and cleans up easily. Worth every penny.",
    "date": "2024-01-30T09:45:00Z",
    "verified_purchase": true
  },
  {
    "id": "R004",
    "product_id": "P002",
    "customer_id": "C003",
    "rating": 4,
    "title": "Very comfortable but assembly was tricky",
    "comment": "This is the most comfortable office chair I've ever had. The only downside was the complicated assembly.",
    "date": "2024-01-28T18:30:00Z",
    "verified_purchase": true
  },
  {
    "id": "R005",
    "product_id": "P005",
    "customer_id": "C004",
    "rating": 5,
    "title": "Luxurious bedding",
    "comment": "Extremely soft and comfortable bedding. Washes well and hasn't shrunk after multiple washes.",
    "date": "2024-02-15T20:15:00Z",
    "verified_purchase": true
  }
]
