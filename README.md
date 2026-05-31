# Smart Darzi Backend

This folder contains a standalone Express + MongoDB backend for the Smart Darzi app.

## Setup

1. Open a terminal in `backend`.
2. Run `npm install`.
3. Create a `.env` file with your local configuration.

Example `.env` values:

```
MONGO_URI=mongodb+srv://username:password@cluster.example.mongodb.net/SmartDarzi?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
PORT=5000
HOST=0.0.0.0
```

4. Start the server:

- `npm start` for production
- `npm run dev` for development with nodemon

## Endpoints

### Authentication
- `POST /api/auth/signup` — create shop account
- `POST /api/auth/login` — login shop account
- `GET /api/auth/me` — get authenticated shop profile

### Customers
- `POST /api/customers` — add a customer profile
- `GET /api/customers` — list customers
- `GET /api/customers/:id` — get customer details
- `PUT /api/customers/:id` — update customer
- `DELETE /api/customers/:id` — delete customer

### Orders
- `POST /api/orders` — add order for customer
- `GET /api/orders` — list orders
- `GET /api/orders/:id` — get order details
- `PUT /api/orders/:id` — update order
- `DELETE /api/orders/:id` — delete order

### Measurements
- `POST /api/measurements` — add measurement record
- `GET /api/measurements` — list measurements
- `GET /api/measurements/:id` — measurement details
- `PUT /api/measurements/:id` — update measurement
- `DELETE /api/measurements/:id` — delete measurement

## Notes

- `logoUrl` and `photoUrl` are optional, so profile/shop images are optional.
- Required environment variables are `MONGO_URI` and `JWT_SECRET`.
