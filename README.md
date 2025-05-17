# 📝 Blog Editor Application

A full-stack blog editor built with React, Node.js, and MongoDB. Supports rich blog editing, auto-saving drafts, publishing, and viewing all blogs.

## 🚀 Features

- Create and edit blog posts
- Auto-save drafts (after 5 seconds of inactivity)
- Save manually as draft
- Publish blogs
- View all blogs (drafts & published)
- Edit existing drafts or published blogs
- Toast notifications on auto-save

## 🧱 Tech Stack

- **Frontend**: React.js, React Router, Axios, React Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **UI**: plain CSS

---

## 🖼️ Screenshots

- 🏠 Landing Page  
- 📝 Blog Editor with Auto-Save  
- 📃 List of Blogs (Drafts and Published)

---

## 📦 Installation

### Backend

```bash
cd Blog-Editor-Backend
npm install
npm run dev
```

### Frontend

```bash
cd Blog-Editor-Frontend
npm install
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| POST   | `/api/blogs/save-draft`| Save or update a draft      |
| POST   | `/api/blogs/publish`   | Save and publish a blog     |
| GET    | `/api/blogs`           | Get all blogs               |
| GET    | `/api/blogs/:id`       | Get blog by ID              |
| DELETE | `/api/blogs/:id`       | Delete a blog by ID         |

---

## ✨ Auto-Save Logic

- Debounced auto-save after 5 seconds of inactivity
- Saves draft via API without redirecting
- Visual toast notification on auto-save

---

## 📁 Folder Structure

```
/frontend
  └── components/
  └── pages/
  └── api/BlogApi.js

/backend
  └── models/Blog.js
  └── routes/blogRoutes.js
  └── server.js
```

---

## 📜 License

This project is licensed under the MIT License.