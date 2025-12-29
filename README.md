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
- Node.js 18.x or higher (for the frontend)
- npm or yarn package manager

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd cartly
```

### Step 2: Database Setup

1. **Install MySQL** if not already installed:
   - Download from [MySQL Official Website](https://dev.mysql.com/downloads/)
   - Follow the installation wizard for your operating system
   - Remember the root password you set during installation

2. **Create the database**:

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE test_db;
```

3. **Verify the database**:

```sql
SHOW DATABASES;
```

You should see `test_db` in the list.

### Step 3: Configure Database Credentials

Update the database credentials in `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_db
    username: root
    password: your-mysql-password  # Replace with your MySQL password
```

**Important**: Replace `your-mysql-password` with your actual MySQL root password.

### Step 4: Backend Setup

1. **Navigate to the project root directory** (if not already there):

```bash
cd cartly
```

2. **Build the backend application**:

```bash
# On Windows
gradlew.bat clean build

# On Unix/Mac/Linux
./gradlew clean build
```

This will:
- Download all dependencies
- Compile the Java code
- Run tests
- Create the executable JAR file

3. **Start the backend server**:

```bash
# On Windows
gradlew.bat bootRun

# On Unix/Mac/Linux
./gradlew bootRun
```

Alternatively, you can run the JAR directly:

```bash
java -jar build/libs/program-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8080**

4. **Verify backend is running**:

Open your browser and navigate to:
- http://localhost:8080/api/products (should return an empty array or products)
- http://localhost:8080/mcp (MCP endpoint)

### Step 5: Frontend Setup

1. **Navigate to the frontend directory**:

```bash
cd cartly-ui
```

2. **Install dependencies**:

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

3. **Start the development server**:

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

The frontend will start on **http://localhost:3000**

4. **Verify frontend is running**:

Open your browser and navigate to http://localhost:3000

### Step 6: Verify Complete Setup

1. **Backend health check**:
   - Backend should be running on port 8080
   - Database connection should be established
   - Check console for "Started ProgramApplication" message

2. **Frontend connectivity**:
   - Frontend should be running on port 3000
   - Should be able to communicate with backend API
   - Navigate through the application to test functionality

3. **Test the integration**:
   - Try browsing products
   - Create a user account
   - Add items to cart

## Troubleshooting Setup Issues

### Database Connection Issues

**Error**: `java.sql.SQLException: Access denied for user 'root'@'localhost'`

**Solution**: 
- Verify your MySQL password in `application.yml`
- Ensure MySQL service is running
- Check if the database `test_db` exists

**Error**: `Communications link failure`

**Solution**:
- Ensure MySQL is running on port 3306
- Check firewall settings
- Verify MySQL service is started

### Port Already in Use

**Error**: `Port 8080 is already in use`

**Solution**:
- Stop other applications using port 8080
- Or change the port in `application.yml`:
  ```yaml
  server:
    port: 8081
  ```

### Frontend Cannot Connect to Backend

**Solution**:
- Verify backend is running on http://localhost:8080
- Check browser console for CORS errors
- Ensure both frontend and backend are running

### Gradle Build Failures

**Error**: `Could not resolve dependencies`

**Solution**:
- Check your internet connection
- Clear Gradle cache: `./gradlew clean --refresh-dependencies`
- Delete `.gradle` folder and rebuild

### Node/npm Issues

**Error**: `Module not found`

**Solution**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure you're using Node.js 18.x or higher

## Quick Start (All-in-One)

For experienced developers, here's a quick start:

```bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE test_db;"

# 2. Update application.yml with your MySQL password

# 3. Start backend (in project root)
./gradlew bootRun

# 4. In a new terminal, start frontend
cd cartly-ui
npm install && npm run dev
```

Access the application at http://localhost:3000

## Integrating MCP with AI Assistants

The Cartly MCP server can be integrated with AI assistants like GitHub Copilot and Claude AI to enable natural language interactions with the shopping platform.

### Prerequisites for MCP Integration

1. Backend server must be running on http://localhost:8080
2. MCP endpoint is available at http://localhost:8080/mcp
3. The `mcp-server.json` configuration file is present in the project root

### Integrating with GitHub Copilot

GitHub Copilot supports MCP servers through VS Code. Follow these steps:

#### Step 1: Install Required Extensions

1. Open Visual Studio Code
2. Install the **GitHub Copilot** extension (if not already installed)
3. Ensure you have an active GitHub Copilot subscription

#### Step 2: Configure MCP in VS Code

1. **Open VS Code Settings**:
   - Press `Ctrl + ,` (Windows/Linux) or `Cmd + ,` (Mac)
   - Or go to File → Preferences → Settings

2. **Configure MCP Servers**:
   - Search for "MCP" in settings
   - Look for "GitHub > Copilot > MCP: Servers"
   - Click "Edit in settings.json"

3. **Add the Cartly MCP Server**:

Add the following configuration to your VS Code `settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "cartly": {
      "transport": "streamable",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

#### Step 3: Using MCP in GitHub Copilot Chat

1. **Start the backend server** (if not already running):
   ```bash
   ./gradlew bootRun
   ```

2. **Open GitHub Copilot Chat** in VS Code:
   - Click the chat icon in the sidebar
   - Or press `Ctrl + Alt + I` (Windows/Linux) or `Cmd + Option + I` (Mac)

3. **Use MCP tools in chat**:

Example prompts:
- "Show me all products in the store"
- "Create a new product named 'Laptop' with price 999.99"
- "Find products in the electronics category"
- "Add product ID 5 to user 1's cart with quantity 2"
- "Get all users in the system"

The AI will automatically use the MCP tools to interact with your shopping backend!

### Integrating with Claude Desktop (Anthropic)

Claude Desktop app supports MCP servers natively.

#### Step 1: Install Claude Desktop

1. Download Claude Desktop from [Anthropic's website](https://claude.ai/download)
2. Install and sign in with your Anthropic account

#### Step 2: Configure MCP Server

1. **Locate Claude's configuration directory**:

   - **Windows**: `%APPDATA%\Claude\`
   - **macOS**: `~/Library/Application Support/Claude/`
   - **Linux**: `~/.config/Claude/`

2. **Create or edit `claude_desktop_config.json`**:

```json
{
  "mcpServers": {
    "cartly": {
      "transport": "streamable",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

Alternatively, you can copy the provided `mcp-server.json` file:

```bash
# Windows (PowerShell)
Copy-Item mcp-server.json "$env:APPDATA\Claude\claude_desktop_config.json"

# macOS/Linux
cp mcp-server.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop for the configuration to take effect.

#### Step 4: Using MCP in Claude

1. **Ensure backend is running**:
   ```bash
   ./gradlew bootRun
   ```

2. **Start a conversation in Claude Desktop**

3. **Use natural language to interact**:

Example prompts:
- "List all available products"
- "Create a new user with email test@example.com"
- "What products have a rating above 4.5?"
- "Add the laptop product to my cart"
- "Show me all electronics items"

Claude will automatically discover and use the MCP tools exposed by the Cartly backend!

### Verifying MCP Integration

To verify your MCP integration is working:

1. **Check backend logs** for incoming MCP requests
2. **Test a simple query** in the AI assistant:
   ```
   "Can you show me all products using the MCP tools?"
   ```
3. **Look for tool usage** - The AI should indicate it's using MCP tools
4. **Verify responses** contain actual data from your database

### MCP Tools Available

Once integrated, the AI assistants can use these tools:

**Product Operations**:
- `create_product` - Create new products
- `find_all_products` - List all products
- `find_product_by_id` - Get specific product
- `find_by_product_category` - Filter by category
- `find_by_product_rating` - Search by rating

**User Operations**:
- `get-all-users` - List all users
- `get-user-by-id` - Get user details
- `update-users` - Update user info
- `delete-users` - Remove users

**Cart Operations**:
- `add-product-to-cart` - Add items to cart
- `get-cart-by-id` - View cart contents
- `get-all-cart-details` - List all carts
- `update-cart-by-id` - Update cart items
- `delete-from-cart` - Remove from cart

### Troubleshooting MCP Integration

**Issue**: AI assistant doesn't recognize MCP tools

**Solutions**:
- Verify backend is running on port 8080
- Check MCP endpoint: http://localhost:8080/mcp
- Restart the AI assistant application
- Review configuration file for typos

**Issue**: "Connection refused" errors

**Solutions**:
- Ensure backend server is running
- Check firewall settings
- Verify the URL in configuration matches your backend

**Issue**: Tools execute but return no data

**Solutions**:
- Check database connection in backend
- Verify database has data (add test products/users)
- Review backend console for errors

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

This project is currently licensed and this is only taken under permission of the user. 

## Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.
