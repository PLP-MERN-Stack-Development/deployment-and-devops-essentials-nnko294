# 🎨 PLP Task Manager – Week 3 Assignment

> A fully functional React application built with Vite, JSX, and Tailwind CSS demonstrating component architecture, state management with hooks, API integration, and responsive design.

## ✅ Assignment Completion Checklist

All required tasks from **Week 3: React.js, JSX, and Tailwind CSS – Mastering Front-End Development** have been completed:

### Task 1: Project Setup ✓
- [x] React application created using Vite
- [x] Tailwind CSS configured
- [x] Project structure organized (components, hooks, context, tests)
- [x] Basic routing and layout in place

### Task 2: Component Architecture ✓
- [x] **Button** component with variants (primary, secondary, danger, success, warning)
- [x] **TaskManager** component for task management
- [x] **ThemeToggle** component for light/dark mode
- [x] **ApiData** component for API integration
- [x] Layout component (Navbar + Footer) with responsive design
- [x] All components use props for customization and reusability

### Task 3: State Management and Hooks ✓
- [x] **TaskManager** with full task management:
  - Add new tasks
  - Mark tasks as completed
  - Delete tasks
  - Filter tasks (All, Active, Completed)
- [x] **Hooks used:**
  - `useState` for component state management
  - `useEffect` for side effects (API fetching, theme persistence)
  - `useContext` for theme management (light/dark mode)
  - Custom `useLocalStorage` hook for persisting tasks and theme

### Task 4: API Integration ✓
- [x] Fetch data from **JSONPlaceholder API** (posts)
- [x] Display fetched data in a card-based grid layout
- [x] Loading state with skeleton animations
- [x] Error state with user-friendly messages
- [x] Pagination (10 items per page with prev/next buttons)
- [x] Search feature to filter posts by title or body

### Task 5: Styling with Tailwind CSS ✓
- [x] Responsive design (mobile, tablet, desktop)
- [x] Theme switcher (light/dark mode) using Tailwind's dark mode
- [x] Tailwind utility classes for layout, spacing, typography, colors
- [x] Smooth animations and transitions
- [x] Accessibility improvements (ARIA labels, semantic HTML)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher
- **npm** or yarn package manager

### Installation & Running Locally

```bash
# Install dependencies
npm install

# Start development server (hot-reload enabled)
npm run dev

# Build for production
npm run build

# Run tests (optional)
npm test
```

The development server will run at **http://localhost:5173**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ApiData.jsx           # API data fetching with search & pagination
│   ├── Button.jsx            # Reusable button with variants
│   ├── TaskManager.jsx       # Task management component
│   └── ThemeToggle.jsx       # Theme switcher button
├── context/
│   └── ThemeContext.jsx      # Light/dark theme provider
├── hooks/
│   └── useLocalStorage.js    # Custom hook for localStorage persistence
├── __tests__/
│   ├── TaskManager.test.jsx  # TaskManager component tests
│   └── useLocalStorage.test.jsx  # useLocalStorage hook tests
├── App.jsx                   # Main app component
├── index.css                 # Tailwind CSS setup
└── main.jsx                  # React entry point

Configuration files:
├── vite.config.js            # Vite + React plugin config
├── tailwind.config.cjs       # Tailwind CSS configuration
├── postcss.config.cjs        # PostCSS for Tailwind processing
├── vitest.config.js          # Vitest configuration
└── index.html                # HTML entry point
```

---

## ✨ Features Implemented

### Task Manager
- ✓ Add, complete, and delete tasks
- ✓ Filter tasks (All, Active, Completed)
- ✓ Persistent storage with localStorage
- ✓ Task creation timestamps
- ✓ Remaining tasks counter

### API Integration
- ✓ Fetch 100 posts from JSONPlaceholder
- ✓ Search posts by title or body (debounced)
- ✓ Paginated display (10 posts per page)
- ✓ Loading skeleton animations
- ✓ Error handling with fallback UI

### Theme Support
- ✓ Light/dark mode toggle
- ✓ Persistent theme selection (localStorage)
- ✓ System-wide dark class on `<html>` element
- ✓ All components styled for both themes

### Accessibility
- ✓ ARIA labels on interactive elements
- ✓ Keyboard navigation support
- ✓ Focus indicators and ring styles
- ✓ Semantic HTML structure
- ✓ Screen reader friendly (`sr-only` labels)

### Responsive Design
- ✓ Mobile-first approach
- ✓ Tailwind breakpoints (sm, md, lg)
- ✓ Flexible grid layouts
- ✓ Touch-friendly button sizes

---

## 🎯 Running the Application

1. **Development mode** (with hot reload):
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

2. **Production build**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

---

## 📦 Dependencies

### Main Dependencies
- **React** ^18.2.0 – UI library
- **react-dom** ^18.2.0 – React DOM rendering
- **prop-types** ^15.8.1 – Runtime type checking

### Dev Dependencies
- **Vite** ^5.0.0 – Build tool and dev server
- **@vitejs/plugin-react** ^4.0.0 – React plugin for Vite
- **Tailwind CSS** ^3.4.8 – Utility-first CSS framework
- **PostCSS** ^8.4.21 – CSS transformations
- **autoprefixer** ^10.4.14 – Vendor prefixes
- **Vitest** ^1.0.0 – Unit test framework
- **@testing-library/react** ^14.0.0 – React component testing
- **@testing-library/jest-dom** ^6.0.0 – DOM matchers
- **jsdom** ^22.1.0 – DOM environment for tests

---

## 📝 Assignment Requirements Coverage

| Requirement | Status | Details |
|-------------|--------|---------|
| Project Setup (Vite + Tailwind) | ✅ | Fully configured |
| Button Component | ✅ | Multiple variants (primary, secondary, danger, etc.) |
| TaskManager Component | ✅ | Full CRUD operations + filters + persistence |
| Custom Hooks | ✅ | useLocalStorage for state persistence |
| Theme Management | ✅ | Light/dark mode with ThemeContext + localStorage |
| API Integration | ✅ | JSONPlaceholder posts with search & pagination |
| Responsive Design | ✅ | Mobile-first, Tailwind breakpoints |
| Dark Mode | ✅ | Tailwind dark mode enabled |
| Accessibility | ✅ | ARIA labels, semantic HTML, keyboard support |
| Testing | ✅ | Vitest + React Testing Library |

---

## 📤 Deployment (Optional)

To deploy to Vercel, Netlify, or GitHub Pages:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

After deploying, update the deployment URL here:
```
🌐 Live Demo: [Insert deployed URL here]
```

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

---

## 🎓 Learning Outcomes

By completing this assignment, you have:
- ✅ Built a complete React application from scratch
- ✅ Mastered JSX syntax and component composition
- ✅ Implemented advanced state management with hooks
- ✅ Integrated external APIs with proper error handling
- ✅ Created responsive designs with Tailwind CSS
- ✅ Implemented theme switching and persistence
- ✅ Written unit tests for components and hooks
- ✅ Practiced accessibility and semantic HTML

---

## 📋 Submission Instructions

### Steps to Submit:

1. **Ensure all files are committed:**
   ```bash
   git add .
   git commit -m "Complete Week 3 assignment: Full-featured Task Manager with API integration"
   git push origin main
   ```

2. **Verify your repository:**
   - Check GitHub: https://github.com/PLP-MERN-Stack-Development/[your-repo-name]
   - All files should be visible and properly formatted

3. **Test locally before submission:**
   ```bash
   npm install
   npm run dev
   # Test all features in the browser
   npm run build  # Verify production build works
   ```

4. **Optional: Deploy and add URL**
   - Deploy to Vercel, Netlify, or GitHub Pages
   - Add deployment URL to this README under "🌐 Live Demo"

5. **Submit via GitHub Classroom:**
   - Your submission is complete when your code is pushed to the main branch
   - The autograding system will verify all requirements
   - Instructor will review and provide feedback

---

## ✏️ Completion Summary

**Date Completed:** November 13, 2025  
**Framework:** React 18 with Vite  
**Styling:** Tailwind CSS 3.4  
**State Management:** React Hooks (useState, useEffect, useContext)  
**Testing:** Vitest + React Testing Library  

**All 5 assignment tasks have been completed successfully!**

---

**Status:** ✅ **COMPLETE** – Ready for submission!
