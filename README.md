# Cartly

A Spring Boot application that provides chat-based shopping experience using the Model Context Protocol (MCP). This application enables AI agents and chatbots to interact naturally with an e-commerce platform, managing product catalog, user accounts, and shopping cart functionality through conversational interfaces. Built with Spring AI MCP integration, it allows seamless AI-powered shopping assistance through standardized tool endpoints.

## Overview

This project is a chat-based shopping backend service that leverages the Model Context Protocol (MCP) to enable natural language interactions with an e-commerce platform. AI assistants can help users browse products, manage their accounts, and handle shopping cart operations through conversational interfaces. The application provides both RESTful APIs and MCP tool integrations, with MySQL as the persistent data store.

## Technology Stack

- **Java 21** - Runtime environment
- **Spring Boot 3.5.10** - Application framework
- **Spring Data JPA** - Database operations
- **Spring AI MCP** - Model Context Protocol server integration
- **MySQL** - Relational database
- **Lombok** - Code generation for entities
- **Gradle** - Build and dependency management

## Features

### Product Management
- Create new products with detailed information
- Browse all products in the catalog
- Filter products by category
- Search products by rating
- Retrieve individual product details

### User Management
- Create and manage user accounts
- Update user profile information
- Delete user accounts
- Retrieve user details by ID

### Shopping Cart
- Add products to user carts
- Update cart quantities
- Remove items from cart
- View cart contents by cart ID
- Retrieve all cart information across users

### MCP Integration
The application exposes AI-compatible tools through the Model Context Protocol, enabling AI agents to perform shopping operations programmatically. All major operations are available as MCP tools with proper parameter validation and descriptions.

## Project Structure

```
src/main/java/com/tools/program/
├── ProgramApplication.java          # Main application entry point
├── controller/                      # REST API controllers
│   ├── CartStatusController.java
│   ├── ProductController.java
│   └── UserController.java
├── entity/                          # JPA entity classes
│   ├── cartStatus.java
│   ├── Products.java
│   └── Users.java
├── mcp/                            # MCP tool definitions
│   ├── CartStatusServiceMcp.java
│   ├── ProductServiceMcp.java
│   └── UserServiceMcp.java
├── repository/                      # Data access layer
│   ├── CartStatusRepository.java
│   ├── ProductRepository.java
│   └── UserRepository.java
└── service/                        # Business logic layer
    ├── CartStatusService.java
    ├── ProductService.java
    └── UserService.java
```

## Prerequisites

Before running this application, ensure you have:

- Java Development Kit (JDK) 21 or higher
- MySQL 8.0 or higher
- Gradle (or use the included Gradle wrapper)

## Database Setup

Create a MySQL database for the application:

```sql
CREATE DATABASE test_db;
```

The application is configured to use the following default credentials:
- **URL**: `jdbc:mysql://localhost:3306/test_db`
- **Username**: `root`
- **Password**: `replace-password`

Update these credentials in `application.yml` if your setup differs.

## Configuration

The main configuration is located in `application.yml`:

```yaml
spring:
  ai:
    mcp:
      server:
        enabled: true
        type: SYNC
        name: shopping-data-management
        protocol: STREAMABLE
        endpoint: /mcp
  datasource:
    url: jdbc:mysql://localhost:3306/test_db
    username: root
    password: replace-password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

The MCP server is configured to:
- Run in synchronous mode
- Be accessible at `/mcp` endpoint
- Scan for annotated tools in `com.tools.program.mcp` package

## Building the Application

Using Gradle wrapper (recommended):

```bash
# On Windows
gradlew.bat build

# On Unix/Mac
./gradlew build
```

Using local Gradle installation:

```bash
gradle build
```

## Running the Application

Start the application using:

```bash
# On Windows
gradlew.bat bootRun

# On Unix/Mac
./gradlew bootRun
```

Or run the JAR file after building:

```bash
java -jar build/libs/program-0.0.1-SNAPSHOT.jar
```

The application will start on the default port 8080.

## API Endpoints

### Product Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/rating/{rating}` - Get products by rating
- `POST /api/products` - Create a new product

### User Endpoints

Standard REST endpoints are available for user operations including creation, retrieval, update, and deletion.

### Cart Endpoints

Manage shopping cart operations through dedicated endpoints for adding, updating, and removing items.

## MCP Tools

The application exposes the following MCP tools for AI agent interaction:

### Product Tools
- `create_product` - Create new product entries
- `find_product_by_id` - Retrieve product details
- `find_all_products` - List all available products
- `find_by_product_category` - Filter products by category
- `find_by_product_rating` - Search products by rating

### User Tools
- `get-all-users` - Retrieve all user accounts
- `get-user-by-id` - Get specific user details
- `delete-users` - Remove user accounts
- `update-users` - Modify user information

### Cart Tools
- `add-product-to-cart` - Add items to shopping cart
- `get-cart-by-id` - Retrieve cart details
- `delete-from-cart` - Remove items from cart
- `update-cart-by-id` - Update cart contents
- `get-all-cart-details` - View all cart information

## Testing

Run the test suite using:

```bash
# On Windows
gradlew.bat test

# On Unix/Mac
./gradlew test
```

Test reports will be generated in `build/reports/tests/test/index.html`.

## Data Models

### Product
- Product ID (auto-generated)
- Name
- Description (text)
- Price
- Image URL
- Category
- Stock quantity
- Rating (float)

### User
- User ID (auto-generated)
- Name
- Age
- Gender
- Email
- Password
- Phone number

### Cart Status
- Cart ID (auto-generated)
- User ID (foreign reference)
- Product ID (foreign reference)
- Quantity

## Development Notes

- The application uses Hibernate with `ddl-auto: update` which automatically updates the database schema based on entity changes
- SQL queries are logged to console with formatting enabled for debugging
- Lombok annotations reduce boilerplate code in entity classes
- The MCP annotation scanner automatically discovers tools in the configured package

## Contributing

When contributing to this project:

1. Ensure all tests pass before submitting changes
2. Follow the existing code structure and naming conventions
3. Update documentation for any new features or API changes
4. Add appropriate MCP tool annotations for AI-accessible operations

## License

This project is currently unlicensed. Please contact the project maintainers for usage permissions.

## Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.
