import { Component, OnInit } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.css']
})
export class ApiDocsComponent implements OnInit {

  localhostUrl = "http://localhost:3001/api";
  uniquePaths = [];

  myApi = [
    {
      description: "Create new cart",
      method: "post",
      path: "/carts",
      request: {},
      response: 4,
      responseVerbal: "Returns the cart ID"
    },
    {
      description: "Delete cart",
      method: "delete",
      path: "/carts",
      params: "/:cartId",
      request: {},
      response: {}
    },
    {
      description: "Get cart data",
      method: "get",
      path: "/carts",
      params: "/:cartId",
      request: {},
      response: [
        {
          "id": 5,
          "productId": 12,
          "quantity": 1,
          "totalPrice": 41,
          "name": "Entrecôte",
          "price": 41,
          "imageURL": "/assets/images/products/entrecote.png"
        },
        {
          "id": 6,
          "productId": 15,
          "quantity": 1,
          "totalPrice": 3,
          "name": "Tortillas",
          "price": 3,
          "imageURL": "/assets/images/products/tortillas.png"
        }
      ]
    },
    {
      description: "Add item to cart",
      method: "post",
      path: "/carts",
      params: "/item",
      request: {
        productId: 5,
        quantity: 1
      },
      response: {}
    },
    {
      description: "Update item already in cart",
      method: "put",
      path: "/carts",
      params: "/:cartId",
      request: {
        productId: 1,
        quantityAdded: 1
      },
      response: {}
    },
    {
      description: "Delete item from cart",
      method: "delete",
      path: "/carts",
      params: "/:cartItemId",
      request: {},
      response: {}
    },
    {
      description: "Get all categories",
      method: "get",
      path: "/categories",
      request: {},
      response: [
        {
          "id": 3,
          "categoryName": "Breads"
        },
        {
          "id": 4,
          "categoryName": "Fruits"
        },
        {
          "id": 2,
          "categoryName": "Meat & Chicken"
        },
        {
          "id": 1,
          "categoryName": "Milk & Dairy"
        },
        {
          "id": 6,
          "categoryName": "Snacks"
        },
        {
          "id": 5,
          "categoryName": "Vegetables"
        }
      ],
      responseVerbal: "Returns categories sorted by alphabetical order"
    },
    {
      description: "Get unavailable shipping dates",
      method: "get",
      path: "/orders",
      params: "/unavailable-dates",
      request: {},
      response: [
        {
          "deliveryDate": "2022-07-09T21:00:00.000Z"
        },
        {
          "deliveryDate": "2022-06-27T21:00:00.000Z"
        }
      ]
    },
    {
      description: "Create new order",
      method: "post",
      path: "/orders",
      request: {
        city: 'Tel Aviv',
        streetAddress: 'Arlozoroff',
        deliveryDate: '2022-07-09',
        creditCard: '1111'
      },
      response: {}
    },
    {
      description: "Get all products",
      method: "get",
      path: "/products",
      request: {},
      response: [
        {
          "id": 1,
          "name": "Milk 3% Fat",
          "categoryName": "Milk & Dairy",
          "price": 2,
          "imageURL": "/assets/images/products/milk.png"
        },
        {
          "id": 2,
          "name": "Fruity Yogurt 3% Fat",
          "categoryName": "Milk & Dairy",
          "price": 1.5,
          "imageURL": "/assets/images/products/yogurt.png"
        },
        {
          "id": 3,
          "name": "Cottage Cheese 5% Fat",
          "categoryName": "Milk & Dairy",
          "price": 2,
          "imageURL": "/assets/images/products/cottage-cheese.png"
        },
        {
          "id": 4,
          "name": "Cheese 28% Fat",
          "categoryName": "Milk & Dairy",
          "price": 8,
          "imageURL": "/assets/images/products/cheese.png"
        },
        {
          "id": 5,
          "name": "Tomatoes (8 Count)",
          "categoryName": "Vegetables",
          "price": 1.7,
          "imageURL": "/assets/images/products/tomatoes.png"
        },
        {
          "id": 6,
          "name": "Bell Pepper (3 Count)",
          "categoryName": "Vegetables",
          "price": 3,
          "imageURL": "/assets/images/products/bell-peppers.png"
        },
        {
          "id": 7,
          "name": "Green Apple (3 Count)",
          "categoryName": "Fruits",
          "price": 3,
          "imageURL": "/assets/images/products/green-apples.png"
        },
        {
          "id": 8,
          "name": "Red Apple (3 Count)",
          "categoryName": "Fruits",
          "price": 3,
          "imageURL": "/assets/images/products/red-apples.png"
        },
        {
          "id": 9,
          "name": "Avocados (2 Count)",
          "categoryName": "Fruits",
          "price": 2.9,
          "imageURL": "/assets/images/products/avocados.png"
        },
        {
          "id": 10,
          "name": "Chicken Breast",
          "categoryName": "Meat & Chicken",
          "price": 9,
          "imageURL": "/assets/images/products/chicken-breast.png"
        },
        {
          "id": 11,
          "name": "Whole Chicken",
          "categoryName": "Meat & Chicken",
          "price": 5.5,
          "imageURL": "/assets/images/products/whole-chicken.png"
        },
        {
          "id": 12,
          "name": "Entrecôte",
          "categoryName": "Meat & Chicken",
          "price": 41,
          "imageURL": "/assets/images/products/entrecote.png"
        },
        {
          "id": 13,
          "name": "Denver Steak",
          "categoryName": "Meat & Chicken",
          "price": 29,
          "imageURL": "/assets/images/products/denver-cut.png"
        },
        {
          "id": 14,
          "name": "Buns (6 Count)",
          "categoryName": "Breads",
          "price": 2.6,
          "imageURL": "/assets/images/products/buns.png"
        },
        {
          "id": 15,
          "name": "Tortillas",
          "categoryName": "Breads",
          "price": 3,
          "imageURL": "/assets/images/products/tortillas.png"
        },
        {
          "id": 16,
          "name": "Whole Wheat Bread",
          "categoryName": "Breads",
          "price": 4,
          "imageURL": "/assets/images/products/whole-wheat-bread.png"
        },
        {
          "id": 17,
          "name": "Carrots",
          "categoryName": "Vegetables",
          "price": 1,
          "imageURL": "/assets/images/products/carrots.png"
        },
        {
          "id": 18,
          "name": "Crunchy Chips",
          "categoryName": "Snacks",
          "price": 3,
          "imageURL": "/assets/images/products/crunchy-chips.png"
        },
        {
          "id": 19,
          "name": "Spicy Crunchy Chips",
          "categoryName": "Snacks",
          "price": 3,
          "imageURL": "/assets/images/products/spicy-crunchy-chips.png"
        },
        {
          "id": 20,
          "name": "Chocolate & HazelnutsChocolate",
          "categoryName": "Snacks",
          "price": 2,
          "imageURL": "/assets/images/products/chocolate-hazelnuts.png"
        },
        {
          "id": 21,
          "name": "Grapes Mix",
          "categoryName": "Fruits",
          "price": 8,
          "imageURL": "/assets/images/products/grapes-mix.png"
        }
      ]

    },
    {
      description: "Get products by substring",
      method: "get",
      path: "/products",
      params: "/search/:productSubstringName",
      request: { productSubstringName: "ea" },
      response: [
        {
          "id": 10,
          "name": "Chicken Breast",
          "categoryName": "Meat & Chicken",
          "price": 9,
          "imageURL": "/assets/images/products/chicken-breast.png"
        },
        {
          "id": 13,
          "name": "Denver Steak",
          "categoryName": "Meat & Chicken",
          "price": 29,
          "imageURL": "/assets/images/products/denver-cut.png"
        },
        {
          "id": 16,
          "name": "Whole Wheat Bread",
          "categoryName": "Breads",
          "price": 4,
          "imageURL": "/assets/images/products/whole-wheat-bread.png"
        }
      ]
    },
    {
      description: "Get statistics (orders and products)",
      method: "get",
      path: "/products",
      params: "/stats",
      request: {},
      response: {
        "numberOfProducts": 21,
        "numberOfOrders": 7
      }
    },
    {
      description: "Get product data",
      method: "get",
      path: "/products",
      params: "/:productId",
      request: {},
      response: {
        "id": 10,
        "name": "Chicken Breast",
        "categoryId": 2,
        "price": 9,
        "imageURL": "/assets/images/products/chicken-breast.png"
      }
    },
    {
      description: "Get products of a category",
      method: "get",
      path: "/products",
      params: "/category/:categoryId",
      request: { "categoryId": 3 },
      response: [
        {
          "id": 14,
          "name": "Buns (6 Count)",
          "categoryName": "Breads",
          "price": 2.6,
          "imageURL": "/assets/images/products/buns.png"
        },
        {
          "id": 15,
          "name": "Tortillas",
          "categoryName": "Breads",
          "price": 3,
          "imageURL": "/assets/images/products/tortillas.png"
        },
        {
          "id": 16,
          "name": "Whole Wheat Bread",
          "categoryName": "Breads",
          "price": 4,
          "imageURL": "/assets/images/products/whole-wheat-bread.png"
        }
      ]
    },
    {
      description: "Update product data",
      method: "put",
      path: "/products",
      params: "/:productId",
      request: {
        "id": 1,
        "name": "Milk 3% Fat",
        "categoryId": 1,
        "categoryName": "Milk & Dairy",
        "price": 3,
        "imageURL": "/assets/images/products/milk.png"
      },
      response: {}
    },
    {
      description: "Add new product",
      method: "post",
      path: "/products",
      request: {
        "name": "Chicken Breast",
        "categoryId": 2,
        "categoryName": "Meat & Chicken",
        "price": 9,
        "imageURL": "/assets/images/products/chicken-breast.png"
      },
      response: {}
    },
    {
      description: "Add new user",
      method: "post",
      path: "/users",
      request: {
        "firstName": "Daniel",
        "lastName": "Sternin",
        "email": "daniel@fresh-choice.com",
        "idNumber": "123456782",
        "password": "Adm!n2022",
        "city": "Ashdod",
        "streetAddress": "Dizengoff"
      },
      response: {}
    },
    {
      description: "User login",
      method: "post",
      path: "/users",
      params: "/login",
      request: {
        "email": "daniel@fresh-choice.com",
        "password": "Adm!n2022"
      },
      response: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJUeXBlIjoiQURNSU4iLCJpYXQiOjE2NTYzNDA3NjJ9.K0RM2RbA2t18Ew-K7yfbAHwiG8OSiF8zoDzlPTBsI8c",
        "firstName": "Daniel"
      }
    }
  ];

  constructor(private _titleService: PageTitleService) { }

  ngOnInit(): void {
    let sortingArray = ['post', 'get', 'put', 'delete'];

    this.myApi.sort((a, b) => sortingArray.indexOf(a.method) - sortingArray.indexOf(b.method));
    this.uniquePaths = [...new Set(this.myApi.map(item => item.path))].sort();

    this._titleService.setTitle('API Documentation');
  }
}
