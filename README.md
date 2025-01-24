
# **Task Tree: Local Development Setup Guide**

This guide explains how to set up and run the Task Tree project on your local machine.

---

## **Prerequisites**
Before starting, ensure you have the following installed:
1. **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
2. **Git** - [Download Git](https://git-scm.com/)
3. **Code Editor** (Optional, but recommended: **VS Code**) - [Download VS Code](https://code.visualstudio.com/)

---

## **Steps to Run the Project Locally**

### 1. **Clone the Repository**
Open your terminal and run:
```bash
git clone https://github.com/mn1701/Task-Tree.git
```

### 2. **Navigate to the Project Directory**
Change into the project directory:
```bash
cd task-tree
```

### 3. **Install Dependencies**
Run the following command to install all required packages:
```bash
npm install
```

### 4. **Run the Development Server**
Start the development server by running:
```bash
npm run dev
```

This will start the app on `http://localhost:3000`. Open this URL in your browser to view the site.

---

## **Available Scripts**
Here are some additional scripts you can use during development:
- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Lint the Code**:
  ```bash
  npm run lint
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Start Production Server**:
  ```bash
  npm start
  ```
