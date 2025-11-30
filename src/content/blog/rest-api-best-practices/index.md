---
title: "REST API Cheat Sheet: Best Practices and Guidelines"
description: ''
pubDate: 2024-08-21
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "devops"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/api1.png"
---

## Core Principles

1. **Client-Server**: Separates client and server responsibilities for modularity.

3. **Statelessness**: Each request from a client contains all the information necessary, without storing session data server-side.

5. **Cacheability**: Responses can be cached for better performance.

7. **Layered System**: Layers operate independently and can be changed without impacting others.

9. **Code on Demand** (optional): Servers can extend client functionality by delivering code to be executed client-side.

11. **Uniform Interface**: Consistent interaction across different components.

## HTTP Methods

1. **GET**: Retrieves resources.

3. **POST**: Creates new resources or submits data.

5. **PUT**: Updates or replaces existing resources.

7. **PATCH**: Partially modifies existing resources.

9. **DELETE**: Deletes resources.

11. **HEAD**: Similar to GET but only retrieves headers.

13. **OPTIONS**: Fetches communication options available for a resource.

## Status Codes

1. **2xx (Success)**:
    - **200 OK**: The request was successful.
    
    - **201 Created**: The resource was successfully created.

3. **3xx (Redirection)**:
    - **301 Moved Permanently**: The resource was moved to a new URI.

5. **4xx (Client Error)**:
    - **401 Unauthorized**: Authentication is required or has failed.
    
    - **403 Forbidden**: The server understands the request but refuses to authorize it.
    
    - **404 Not Found**: The requested resource could not be found.

7. **5xx (Server Error)**:
    - **500 Internal Server Error**: A generic error occurred on the server side.

## Security Best Practices

1. **Authentication**: Use OAuth 2.0, [JWT](https://jwt.io/) (JSON Web Tokens).

3. **Authorization**: Implement RBAC (Role-Based Access Control) or ABAC (Attribute-Based Access Control).

5. **HTTPS**: Use TLS/SSL for encrypting communications.

7. **Input Validation**: Always validate and sanitize input data to prevent injection attacks.

9. **Rate Limiting and Throttling**: Implement limits to avoid abuse.

11. **CORS (Cross-Origin Resource Sharing)**: Control access from different origins.

13. **Security Headers**: Use headers like Content-Security-Policy and X-Frame-Options for mitigating web vulnerabilities.

## Resource Naming Conventions

1. **Nouns**: Use nouns for resource names (e.g., `/users`, `/products`).

3. **Pluralization**: Use plural nouns for collections (e.g., `/users`).

5. **Hyphens**: Use hyphens for readability (e.g., `/product-categories`).

7. **Lowercase**: Use lowercase letters consistently.

## Best Practices

1. **Versioning**: Use version numbers in the URI (e.g., `/v1/users`).

3. **Filtering and Sorting**: Apply query parameters for filtering and sorting (e.g., `/users?status=active&sort=name,asc`).

5. **Pagination**: Use limit and offset parameters for large datasets.

7. **Error Handling**: Return clear and consistent error codes and messages.

9. **Documentation**: Use tools like [OpenAPI](https://www.openapis.org/) ([Swagger](https://swagger.io/)) for comprehensive API documentation.

11. **Caching**: Implement server-side and client-side caching for better performance.
