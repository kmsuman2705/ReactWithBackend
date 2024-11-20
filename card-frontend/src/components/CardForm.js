// src/components/CardEditForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardEditForm = ({ cardId, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    // Fetch existing card data to edit
    useEffect(() => {
        if (cardId) {
            axios.get(`https://react-with-backend-silk.vercel.app/cards/${cardId}`)
                .then((response) => {
                    const card = response.data;
                    setTitle(card.title);
                    setDescription(card.description);
                    setImage(card.image);
                })
                .catch((error) => console.error('Error fetching card:', error));
        }
    }, [cardId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the updated card data
        const updatedCard = {
            title,
            description,
            image,
        };

        // Send PUT request to backend
        axios.put(`https://react-with-backend-silk.vercel.app/cards/${cardId}`, updatedCard)
            .then((response) => {
                alert('Card updated successfully!');
                onUpdate();  // Notify parent to update the list
            })
            .catch((error) => console.error('Error updating card:', error));
    };

    return (
        <div>
            <h2>Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button type="submit">Update Card</button>
            </form>
        </div>
    );
};

export default CardEditForm;
