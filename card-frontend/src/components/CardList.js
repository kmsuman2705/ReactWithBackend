import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ title: '', description: '', cardId: '', image: '' });
    const [editingCard, setEditingCard] = useState(null);  // for handling card editing

    // Fetch cards from backend
    useEffect(() => {
        axios.get('http://localhost:5000/cards')
            .then((response) => setCards(response.data))
            .catch((error) => console.error('Error fetching cards:', error));
    }, []);

    // Handle delete
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/cards/${id}`)
            .then(() => {
                alert('Card deleted successfully!');
                setCards((prevCards) => prevCards.filter((card) => card._id !== id));  // Update state
            })
            .catch((error) => console.error('Error deleting card:', error));
    };

    // Handle create (form submission)
    const handleCreate = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/cards', newCard)
            .then((response) => {
                alert('Card created successfully!');
                setCards([...cards, response.data]);  // Add the new card to the list
                setNewCard({ title: '', description: '', cardId: '', image: '' });  // Reset form
            })
            .catch((error) => console.error('Error creating card:', error));
    };

    // Handle update
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/cards/${editingCard._id}`, editingCard)
            .then((response) => {
                alert('Card updated successfully!');
                setCards(cards.map(card => card._id === editingCard._id ? editingCard : card));  // Update card in list
                setEditingCard(null);  // Reset editing state
            })
            .catch((error) => console.error('Error updating card:', error));
    };

    // Set the card for editing
    const handleEdit = (card) => {
        setEditingCard(card);
    };

    return (
        <div>
            <h2>Card List</h2>

            {/* Create Form */}
            <form onSubmit={handleCreate}>
                <h3>Create New Card</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newCard.title}
                    onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newCard.description}
                    onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Card ID"
                    value={newCard.cardId}
                    onChange={(e) => setNewCard({ ...newCard, cardId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newCard.image}
                    onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
                />
                <button type="submit">Create Card</button>
            </form>

            {/* Update Form (if editing) */}
            {editingCard && (
                <form onSubmit={handleUpdate}>
                    <h3>Update Card</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingCard.title}
                        onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={editingCard.description}
                        onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Card ID"
                        value={editingCard.cardId}
                        onChange={(e) => setEditingCard({ ...editingCard, cardId: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={editingCard.image}
                        onChange={(e) => setEditingCard({ ...editingCard, image: e.target.value })}
                    />
                    <button type="submit">Update Card</button>
                </form>
            )}

            {/* Display Cards */}
            <div className="card-container">
                {cards.map((card) => (
                    <div key={card._id} className="card">
                        <img src={card.image} alt={card.title} />
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <button onClick={() => handleEdit(card)}>Edit</button>
                        <button onClick={() => handleDelete(card._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;
