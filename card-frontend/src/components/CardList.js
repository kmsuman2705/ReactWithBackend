import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);  // Track the card being edited
    const [newCard, setNewCard] = useState({ title: '', description: '', cardId: '', image: '' });

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
                setEditingCard(null);  // Clear editing state
            })
            .catch((error) => console.error('Error updating card:', error));
    };

    // Set the card for editing
    const handleEdit = (card) => {
        setEditingCard(card);  // Set selected card for editing
    };

    // Handle input change for edit form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingCard((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h2>Card List</h2>

            {/* Button to open Create Form */}
            <button className="btn-create" onClick={() => setEditingCard({ title: '', description: '', cardId: '', image: '' })}>
                Create New Card
            </button>

            {/* Cards */}
            <div className="card-container">
                {cards.map((card) => (
                    <div key={card._id} className="card">
                        <img src={card.image} alt={card.title} />
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <p><strong>Card ID:</strong> {card.cardId}</p> {/* Display the cardId here */}

                        {/* Show Edit Form for the specific card when "Edit" is clicked */}
                        {editingCard && editingCard._id === card._id ? (
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={editingCard.title}
                                    onChange={handleChange}
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={editingCard.description}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="cardId"
                                    placeholder="Card ID"
                                    value={editingCard.cardId}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    value={editingCard.image}
                                    onChange={handleChange}
                                />
                                <div className="modal-actions">
                                    <button type="submit">Update Card</button>
                                    <button type="button" className="btn-cancel" onClick={() => setEditingCard(null)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="card-actions">
                                <button className="btn-edit" onClick={() => handleEdit(card)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(card._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Create Form */}
            {editingCard && !editingCard._id && (
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newCard.title}
                        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newCard.description}
                        onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                    />
                    <input
                        type="text"
                        name="cardId"
                        placeholder="Card ID"
                        value={newCard.cardId}
                        onChange={(e) => setNewCard({ ...newCard, cardId: e.target.value })}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={newCard.image}
                        onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
                    />
                    <button type="submit">Create Card</button>
                </form>
            )}
        </div>
    );
};

export default CardList;
