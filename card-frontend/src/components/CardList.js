import React, { useState, useEffect } from "react";
import axios from "axios";

function CardList() {
    const [cards, setCards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editCard, setEditCard] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        cardId: "",
    });

    // Fetch the cards from the backend API
    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get("https://react-with-backend-silk.vercel.app/cards");
            setCards(response.data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle create card
    const handleCreateCard = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://react-with-backend-silk.vercel.app/cards", formData);
            setCards([...cards, response.data]);
            setFormData({ title: "", description: "", image: "", cardId: "" });
            setShowForm(false);
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    // Handle edit card
    const handleEditCard = (card) => {
        setEditCard(card);
        setFormData({
            title: card.title,
            description: card.description,
            image: card.image,
            cardId: card.cardId,
        });
        setShowForm(true);
    };

    // Handle update card
    const handleUpdateCard = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `https://react-with-backend-silk.vercel.app/cards/${editCard._id}`,
                formData
            );
            const updatedCards = cards.map((card) =>
                card._id === response.data._id ? response.data : card
            );
            setCards(updatedCards);
            setFormData({ title: "", description: "", image: "", cardId: "" });
            setEditCard(null);
            setShowForm(false);
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    // Handle delete card
    const handleDeleteCard = async (cardId) => {
        try {
            await axios.delete(`https://react-with-backend-silk.vercel.app/cards/${cardId}`);
            const updatedCards = cards.filter((card) => card._id !== cardId);
            setCards(updatedCards);
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div className="container">
            <h2>Card List</h2>

            {/* Button to show create form */}
            <button className="btn-create" onClick={() => setShowForm(true)}>
                Create Card
            </button>

            {/* Form to create or edit a card */}
            {showForm && (
                <form onSubmit={editCard ? handleUpdateCard : handleCreateCard}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Card Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Card Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="cardId"
                        placeholder="Card ID"
                        value={formData.cardId}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="modal-actions">
                        <button type="submit">
                            {editCard ? "Update Card" : "Create Card"}
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                                setShowForm(false);
                                setFormData({ title: "", description: "", image: "", cardId: "" });
                                setEditCard(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Display the list of cards */}
            <div className="card-container">
                {cards.map((card) => (
                    <div
                        className="card"
                        style={{ backgroundImage: `url(${card.image})` }}
                        key={card._id}
                    >
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <p className="card-id">ID: {card.cardId}</p>

                        {/* Card action buttons */}
                        <div className="card-actions">
                            <button
                                className="btn-edit"
                                onClick={() => handleEditCard(card)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => handleDeleteCard(card._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardList;
