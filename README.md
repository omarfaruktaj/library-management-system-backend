# Library Management System API

## Project Description
The Library Management System API is a backend service designed to efficiently manage books, memberships, and borrowing activities of a Library. Built with a focus on CRUD operations, the system allows users to create, read, update, and delete book records, member details, and borrow records.


## Live URL
- **Live Deployment:** [Link to live deployment](https://omar-library-management-system.vercel.app/)

## Technology Stack & Packages
This project utilizes the following technologies and packages:

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **TypeScript**
- **PostgreSQL**
  

## Setup Instructions

Follow these steps to set up the Library Management System API locally:

### Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **PostgreSQL** (use vercel progress)
- **Prisma CLI** (use `npm install prisma -g` to install it globally if you don't have it)

### Installation Steps
1. **Clone the repository**:
    ```bash
    git clone https://github.com/omarfaruktaj/library-management-system-backend
    cd library-management-system-backend
    ```

2. **Install dependencies**:
    ```bash
    yarn
    ```

3. **Setup the environment**:
    Create a `.env` file in the root directory with the following content:
    ```env
    # Need in my work
    POSTGRES_PRISMA_URL= your vercel postgres prisma url
    POSTGRES_URL_NON_POOLING=your vercel  postgres url non pooling 
    ```

4. **Set up the database**:
    - Run Prisma migrations to set up the database schema.
    ```bash
    npx prisma migrate dev
    ```

5. **Start the development server**:
    ```bash
    yarn dev
    ```

    The API will be available at `http://localhost:5000`.


## Key Features & Functionality

### 1. Book CRUD Operations
- **Create Book**: Adds a new book to the library.
- **Read All Books**: Retrieves a list of all books in the library.
- **Read Book by ID**: Fetches details of a specific book by its `bookId`.
- **Update Book**: Updates information for an existing book.
- **Delete Book**: Deletes a book from the library.

### 2. Member CRUD Operations
- **Create Member**: Registers a new library member.
- **Read All Members**: Retrieves a list of all library members.
- **Read Member by ID**: Fetches details of a specific member by their `memberId`.
- **Update Member**: Updates a member's information.
- **Delete Member**: Removes a member from the system.

### 3. Borrow & Return Books
- **Borrow a Book**: Allows members to borrow books.
- **Return a Book**: Allows members to return borrowed books.
- **Overdue Borrow List**: Tracks overdue borrowed books and provides a list of overdue items.

## Known Issues/Bugs
- **Authentication**: There is currently no authentication mechanism in place.


## Conclusion

The Library Management System API provides all the necessary features to manage books, members, and borrowing activities in a library environment. It's designed to be simple, functional, and scalable. Future extensions could include advanced search, book reservations, or member role management.
