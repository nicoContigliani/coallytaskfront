# CoallyTaskFront: A Modern React.js Project with Vite

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


## 🚀 Project Deploy 

Front: https://coallytaskfront.netlify.app
Api: https://coallytaskback.up.railway.app


## 🚀 Project Overview

CoallyTaskFront is a cutting-edge React.js application built with the blazing-fast Vite development server. This project empowers you to manage tasks and streamline your workflow with an intuitive and user-friendly interface.

### 🔐 Authentication

The application features a static login system for demonstration purposes:
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin`
- **JWT Authentication**: Tokens are generated at `http://{domain}/api/auth/`
- **Token Usage**: The generated JWT is required for all API endpoints

### 👨‍💻 Creator

**Nicolás Contigliani** - Full-Stack Developer  
📧 [nico.contigliani@gmail.com](mailto:nico.contigliani@gmail.com)

### 🔗 Repository

[https://github.com/nicoContigliani/coallytaskfront](https://github.com/nicoContigliani/coallytaskfront)

## ✨ Features

- **Efficient Task Management**: Prioritize and accomplish tasks with ease
- **JWT Authentication**: Secure API access with JSON Web Tokens
- **Redux Integration**: State management with Redux Toolkit and Redux DevTools
- **Elegant UI**: Experience a modern and user-friendly interface that enhances productivity
- **Lightning-Fast Performance**: Benefit from Vite's rapid development cycle and optimized builds
- **Responsive Design**: Seamlessly manage tasks across all devices
- **Real-time Updates**: Stay synchronized with instant task status changes
- **Customizable Workflows**: Tailor the app to fit your unique task management style

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 14 or later): [Download here](https://nodejs.org/en/)
- npm Package Manager (included with Node.js installation)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nicoContigliani/coallytaskfront.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd coallytaskfront
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Create and Configure Environment Variables:**

   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=your_api_url_here
   SECRET_KEY_JWT=ASJ

   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   This will launch Vite's development server, opening your project in a browser window at `http://localhost:5173/` by default.

## 📁 Project Structure

```
coallytaskfront/
├── eslint.config.js          # ESLint configuration
├── index.html                # Main entry point
├── package.json              # Project dependencies and scripts
├── postcss.config.cjs        # PostCSS configuration
├── public/                   # Static assets
│   └── vite.svg
├── src/
│   ├── App.css              # Global CSS styles
│   ├── App.jsx              # Main React component
│   ├── assets/              # Application assets
│   │   └── react.svg
│   ├── components/          # Reusable UI components
│   │   ├── ButtonComponent/
│   │   │   └── ButtonComponent.jsx
│   │   ├── forms/
│   │   │   ├── forms.css
│   │   │   └── Forms.jsx
│   │   ├── inputs/
│   │   │   └── InputsComponents.jsx
│   │   └── list/
│   │       └── List.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useTaskFilter.js
│   ├── pages/               # Application pages
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── redux/               # Redux state management
│   │   ├── store.js
│   │   └── tasksSlice.js
│   ├── services/            # API and utility services
│   │   ├── fetchService.js
│   │   ├── snackbarService.js
│   │   └── tokenSerice.js
│   └── utils/               # Utility functions
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js           # Vite configuration
```

## 🧰 Tech Stack

- **React**: A JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **Redux Toolkit**: State management with Redux DevTools integration
- **JWT**: JSON Web Token authentication
- **Tailwind CSS**: A utility-first CSS framework
- **ESLint**: Tool for identifying and reporting on patterns in JavaScript

## 🔒 Authentication Flow

1. User logs in with static credentials (admin/admin)
2. Backend generates JWT token at `/api/auth/`
3. Token is stored and managed by `tokenService.js`
4. All subsequent API requests include the JWT in headers
5. Redux manages authentication state

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/nicoContigliani/coallytaskfront/issues).

## 📜 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 🙏 Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [JWT](https://jwt.io/)

---

Made with ❤️ by Nicolás Contigliani