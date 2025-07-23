
---

# Product Dashboard

A responsive product dashboard web application built using **React**, **Tailwind CSS**. It displays key metrics, a dynamic table of products, and interactive UI components to help visualize data effectively.

---

## 🛠️ Setup Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/joydeep2001/product-dashboard.git
   cd product-dashboard
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

---

## ✨ Feature Overview

* 📊 **Dashboard Cards**: Show total products, revenue, etc.
* 📦 **Product Table**: Paginated, sortable, and searchable list of products.
* 🔍 **Responsive UI**: Mobile-first and adaptable layout using Tailwind CSS.

---

## ⚙️ Optimizations

* **Memoization** using `React.memo` for preventing unnecessary re-renders.
* **Virtualized Table Rendering** for large product lists (if implemented).
* **Tailwind Responsive Utilities** to minimize media queries and reduce CSS size.
* **Component Reusability** across cards, table rows, and modals.
* **Debounced Search** in the table for performance.

---

## ⏱️ Time Tracking (per feature)

| Feature              | Time Spent |
| -------------------- | ---------- |
| Dashboard Cards      | 0.5 hrs      |
| Product Table        | 6.5 hrs    |
| Responsive Layout    | 1 hrs      |
| Sorting & Pagination | 2.5 hrs    |
| Styling & Animations | 1 hr       |
| Overall Debugging    | 2.5 hrs    |
| **Total**            | **14 hrs** |

> 📝 *Note: Most of the time was spent perfecting the Product Table, including responsiveness, sort logic, pagination, and drag-and-drop.*

---

## 🧩 Challenges & Solutions

| Challenge                                            | Solution                                              |
| ---------------------------------------------------- | ----------------------------------------------------- |
| Rendering performance dropped when loading many rows | Implemented memoization and considered virtualization |
| Table layout broke on mobile                         | Used Tailwind's responsive grid & overflow utilities  |
| Sort logic didn't work as expected                   | Rewrote the sort function with stable array sorting   |

---
