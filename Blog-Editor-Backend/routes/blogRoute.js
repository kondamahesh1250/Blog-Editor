const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Save or update a draft
router.post('/save-draft', async (req, res) => {
    const { id, title, content, tags } = req.body;
    try {
        let blog;
        if (id) {
            blog = await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'draft' }, { new: true });
        } else {
            blog = new Blog({ title, content, tags, status: 'draft' });
            await blog.save();
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Publish an article
router.post('/publish', async (req, res) => {
    const { id, title, content, tags } = req.body;
    try {
        let blog;
        if (id) {
            blog = await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'published' }, { new: true });
        } else {
            blog = new Blog({ title, content, tags, status: 'published' });
            await blog.save();
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ updated_at: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve a blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a blog by ID
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
