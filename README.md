# Superhero Project Docker Compose Setup

## Prerequisites
- Docker
- Docker Compose

## Getting Started

### Development
1. Clone the repository
2. Run `docker-compose up --build`
3. Frontend will be available at `http://localhost:3001`
4. Backend API will be available at `http://localhost:3000`

### Stopping the Application
- Run `docker-compose down`

### Rebuilding Services
- Run `docker-compose up --build`

### Running Tests
- Run `docker-compose exec backend npm run test`

### Notes
1. For team collaboration, we can split our task by controller or either by frontend or backend feature. For code checking, we can use ESLint or TSLint.
2. We can also create jest unit test and also cypress e2e to test each others features.
3. If I had more time, i can add more features such as pagination, sorting, searching, and filtering. I can also use zustand for global state management and react-query for data fetching.
4. I can also add postman or swagger for API documentation.