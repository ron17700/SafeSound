# SafeSound

## Development Setup

In development, the client and server are run separately with the following commands:

### Client
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Server
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Start the development server:
   ```bash
   npm run start:dev
   ```

---

## Production Setup

In production, the client is built into static files, and the server is managed by PM2 for better process management and scalability.

### Steps to Deploy

#### 1. Build the Client
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Build the production-ready static files:
   ```bash
   npm run build
   ```

#### 2. Build the Server
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Compile the server code into JavaScript:
   ```bash
   npm run build
   ```

#### 3. Start the Application with PM2
1. Run the production server with PM2:
   ```bash
   npm run start:prod
   ```
   This command uses PM2 to manage the server process and ensures high availability and scalability.

---

## Summary

- **Development**:
    - Client: `npm run dev`
    - Server: `npm run start:dev`

- **Production**:
    - Build Client: `npm run build` (inside the `client` directory)
    - Build Server: `npm run build` (inside the `server` directory)
    - Start Server: `npm run start:prod` (runs with PM2)
