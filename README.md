# Nitro Service

A consumer portal service built with [Nitro](https://nitro.build) and Azure Cosmos DB, structured around Domain-Driven Design (DDD) principles.

## Overview

This service provides RESTful endpoints for managing customers, loans, and notifications data. It uses Cosmos DB as the data store and implements a domain-driven architecture with separate domains for each business entity.

## Architecture

The project is organized using DDD principles with the following domains:

- **Customers**: Customer entity management
- **Loans**: Loan entity management
- **Notifications**: Placeholder domain for future CRUD operations

### Key Design Decisions

- **Many-to-many relationship**: Customers and loans have a many-to-many relationship. Customers store references to loans rather than embedding loan documents directly.
- **Cosmos client setup**: The Cosmos DB client is configured in the cosmos plugin with factory methods available in the cosmos utility.
- **Data seeding**: The seed-data plugin orchestrates db-setup factory methods across each domain to populate initial data.
- **Composite views**: The `/customers/me` endpoint constructs a composite view by fetching customer and associated loans using domain service methods, then joins them in memory using `Promise.all`.

## API Endpoints

### `/customers/me`
Returns a composite view of the authenticated customer's information along with all associated loans. Currently serves mock data; will eventually implement JWT authentication to read user information from the token.

### `/customers/:id`
Retrieves customer information by ID. Intended for management screens and will eventually be locked down with proper authorization.

### `/loans/:id`
Retrieves loan information by ID. Intended for management screens and will eventually be locked down with proper authorization.

## Running the Project

### Prerequisites
- Docker with [host networking enabled](https://docs.docker.com/engine/network/#host)

### Important: Host Networking Required

The Cosmos DB emulator has DNS resolution issues when running with Docker's default bridge networking. To work around this, the nitro-service runs on the host network to access the Cosmos emulator properly.

### Start the Application

From the project root directory:

```bash
docker compose up --build -d
```

### Stop the Application

```bash
docker compose down -v
```

The `-v` flag removes volumes to ensure a clean shutdown.
