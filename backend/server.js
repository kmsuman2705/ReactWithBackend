// server.js
import express from 'express'
import dotenv from 'dotenv'
import { createClient } from '@sanity/client'  // Updated import
import cors from 'cors'

// Load environment variables from .env file
dotenv.config()

// Access the environment variables
const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiToken = process.env.SANITY_API_TOKEN
const port = process.env.PORT || 5000

console.log('Sanity Project ID:', projectId)  // Check if the environment variables are loaded

// Initialize Express
const app = express()
app.use(cors())
app.use(express.json())  // For parsing application/json

// Set up the Sanity client with environment variables
const client = createClient({
    projectId: projectId,  // Your Sanity project ID
    dataset: dataset,  // Dataset name (e.g., "sumandataset")
    token: apiToken,  // API Token (for write operations, if available)
    useCdn: true,  // Enable CDN for faster data fetching (for read-only use)
    apiVersion: '2024-11-01',  // Add the current API version to prevent deprecation warnings
})

// CRUD API Endpoints

// Fetch all cards
app.get('/cards', async (req, res) => {
    try {
        const cards = await client.fetch('*[_type == "card"]')  // Fetch all cards from Sanity dataset
        res.status(200).json(cards)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create a new card
app.post('/cards', async (req, res) => {
    const { title, description, cardId, image } = req.body
    try {
        const createdCard = await client.create({
            _type: 'card',
            title,
            description,
            cardId,
            image,
        })
        res.status(201).json(createdCard)  // Respond with created card data
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Update an existing card
app.put('/cards/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, cardId, image } = req.body
    try {
        const updatedCard = await client.patch(id)
            .set({ title, description, cardId, image })  // Update the card fields
            .commit()
        res.status(200).json(updatedCard)  // Respond with updated card data
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Delete a card
app.delete('/cards/:id', async (req, res) => {
    const { id } = req.params
    try {
        await client.delete(id)  // Delete the card with the given ID
        res.status(204).send()  // No content, successful deletion
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
