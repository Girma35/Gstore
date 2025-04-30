
# GStore - Ecommerce Platform

GStore is a dynamic, responsive ecommerce platform designed to offer a seamless shopping experience for users. It includes a variety of features for both customers and administrators, such as product browsing, cart management, order checkout, and an integrated map for location tracking.

This project leverages modern web technologies like React, Next.js, Tailwind CSS, Node.js, and Express.js to create a full-stack solution for an engaging shopping experience.

## Features

- **Responsive Design**: Optimized for mobile and desktop views, ensuring a great experience on any device.
- **Cart System**: Users can add, remove, and update items in the cart with ease.
- **Checkout Process**: Simplified checkout process for users to complete their purchases.
- **Product Search and Filter**: Users can browse and search for products, filtering by categories.
- **Social Media Integration**: Quick access to social media platforms like LinkedIn, GitHub, Instagram, and Facebook.
- **Location Map**: Built-in map feature showing store locations using dynamic content.
- **Dynamic Content**: Automatic updates for product inventory and order statuses.
- **Backend API**: A Node.js and Express.js backend to handle cart management, user authentication, and orders.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing user, product, and order data)
- **State Management**: React Context API
- **Libraries**:
  - React Router for client-side routing
  - Framer Motion for animation effects
  - Dynamic Map using a custom Map component
- **Version Control**: Git, GitHub
- **Deployment**: Netlify (Frontend), Heroku (Backend)
  
## Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies for the backend:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your environment variables (e.g., MongoDB URI, JWT secrets, etc.).

   Example:

   ```
   MONGO_URI=mongodb://localhost:27017/gstore
   JWT_SECRET=your_jwt_secret
   ```

4. Run the backend server:

   ```bash
   npm start
   ```

5. The backend server will be running at `http://localhost:5000`.

## Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Girma35/Gstore.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Gstore
   ```

3. Install frontend dependencies:

   ```bash
   npm install
   ```

4. Run the frontend development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```
   http://localhost:3000
   ```

## Directory Structure

```
Gstore/
│
├── backend/                    # Backend (Node.js, Express.js) files
│   ├── controllers/             # Express.js route controllers
│   ├── models/                  # Mongoose models (e.g., User, Product, Order)
│   ├── routes/                  # API routes
│   ├── config/                  # Environment variables and other configurations
│   └── server.js                # Main server entry point
│
├── src/                         # Frontend (React, Next.js) files
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── assets/
│   ├── styles/
│   └── utils/
│
├── package.json                 # Frontend dependencies
├── tsconfig.json                # TypeScript configuration for the frontend
└── README.md                    # Project documentation
```

## API Endpoints

### Product Endpoints

- **GET /api/products**: Fetch all products
- **GET /api/products/:id**: Fetch a single product by ID

### Cart Endpoints

- **POST /api/cart/add**: Add an item to the cart
- **DELETE /api/cart/remove/:id**: Remove an item from the cart

### Order Endpoints

- **POST /api/order**: Place a new order
- **GET /api/order/:id**: Get order details by ID

## Contributing

We welcome contributions from the open-source community. Feel free to fork the repository, submit issues, or open pull requests for bug fixes or new features.

### Steps to contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Next.js for providing the structure and server-side rendering.
- Tailwind CSS for quick styling and responsive design.
- Express.js and Node.js for building the backend API.
- MongoDB for data storage and management.

## Contact

For any inquiries or questions, feel free to reach out to the project maintainer:

- Email: [girmawakeyo4@gmail.com](mailto:girmawakeyo4@gmail.com])
- GitHub: [https://github.com/Girma35](https://github.com/Girma35)
