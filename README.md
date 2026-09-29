# OneCloud Document Management

An enterprise-style Document Management frontend application built with React, TypeScript, Tailwind CSS, TanStack Query, Axios, React Hook Form, Zod, and MSW.

## Overview

OneCloud Document Management provides a centralized interface for managing documents, favorites, categories, uploads, and deleted documents.

The project focuses on reusable components, API integration, form validation, client-side routing, and a clean enterprise-style user interface.

## Features

* Dashboard with document statistics
* Document listing and search
* Document filtering and sorting
* Document details view
* Upload document with form validation
* Categories management
* Add, edit, and delete categories
* Favorite documents
* Trash management
* Restore and delete documents
* Responsive sidebar navigation
* API integration using Axios
* Server-state management using TanStack Query
* Mock API using MSW
* Form validation using React Hook Form and Zod
* Responsive UI using Tailwind CSS
* Client-side routing using React Router

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* Axios
* React Hook Form
* Zod
* Lucide React
* MSW
* ESLint
* Prettier
* Git & GitHub

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── categories/
│   ├── common/
│   ├── dashboard/
│   ├── documents/
│   ├── favorites/
│   ├── trash/
│   └── upload/
├── hooks/
├── layouts/
├── mocks/
│   ├── data/
│   └── handlers/
├── pages/
│   ├── categories/
│   ├── dashboard/
│   ├── documents/
│   ├── errors/
│   ├── favorites/
│   ├── trash/
│   └── upload/
├── routes/
├── schemas/
├── services/
│   └── api/
├── types/
└── utils/
```

## API & Data Handling

The application uses Axios for API requests and TanStack Query for fetching and managing server state.

MSW is used to mock backend API responses during frontend development and testing.

Example API endpoint:

```text
GET /api/dashboard
```

## Environment Variables

This project currently uses MSW for mock API integration, so no environment variables are required to run the application locally.

If a real backend API is integrated in the future, environment variables can be added for API configuration.

## Validation

Forms are handled using React Hook Form with Zod schema validation to provide structured and reliable form validation.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

## Build

To create a production build:

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Code Quality

The project uses ESLint and Prettier to maintain code quality and consistent formatting.

## Testing & Verification

The following areas were verified during final testing:

* Dashboard navigation
* Document listing
* Search, filter, and sorting
* Document details
* Document upload and validation
* Categories CRUD operations
* Favorites navigation and actions
* Trash operations
* Sidebar navigation
* API integration
* Responsive UI interactions

## Project Status

The project is completed with the main pages, API integration, routing, UI improvements, and final testing completed.

## Future Improvements

- Connect the application with a real backend API
- Add authentication and role-based access control
- Add advanced document preview and download support
- Add pagination and advanced filtering
- Add automated unit and integration tests
