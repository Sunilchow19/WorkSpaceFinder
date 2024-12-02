import React, { useState } from "react";
import "../Styles/rateus.css";

function RateUsForm() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  const emojis = ["😡", "😞", "😐", "😊", "😍"];
  const feedbackTexts = ["Very Bad", "Bad", "Okay", "Good", "Excellent"];

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setShowModal(true); // Show modal for missing rating
      return;
    }

    // Show modal after submission
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form if desired
    setRating(0);
    setFeedback("");
  };

  const styles = {
    container: { textAlign: "center", margin: "50px auto" },
    emoji: { fontSize: "50px", cursor: "pointer", margin: "10px" },
    selectedEmoji: { fontSize: "60px", color: "#007BFF" },
    button: { backgroundColor: "#007BFF", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", marginTop: "20px" },
    feedbackBox: { width: "80%", height: "80px", marginTop: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "none" },
    feedbackText: { fontSize: "18px", marginTop: "10px", fontWeight: "bold" },
    modal: { position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: "white", padding: "30px", borderRadius: "10px", textAlign: "center", maxWidth: "400px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
    modalButton: { marginTop: "15px", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }
  };

  return (
    <div style={styles.container}>
      <h2 className="register-heading"><i>Rate Us</i></h2>
      <div>
        {emojis.map((emoji, index) => (
          <span
            key={index}
            style={rating === index + 1 ? styles.selectedEmoji : styles.emoji}
            onClick={() => handleRatingClick(index)}
          >
            {emoji}
          </span>
        ))}
      </div>
      {rating > 0 && <div style={styles.feedbackText}>{feedbackTexts[rating - 1]}</div>}

      <textarea
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={styles.feedbackBox}
      />
      <br />
      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {rating > 0 ? (
              <>
                <h3>Thank you for your feedback!</h3>
                <p>Your rating: {feedbackTexts[rating - 1]}</p>
                {feedback && <p>Feedback: {feedback}</p>}
              </>
            ) : (
              <h3>Please select a rating.</h3>
            )}
            <button onClick={closeModal} style={styles.modalButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RateUsForm;
