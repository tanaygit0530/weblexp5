import React, { useState } from "react";

function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form
  const validate = () => {
    let tempErrors = {};

    if (!formData.name) {
      tempErrors.name = "Name is required";
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    return tempErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <div>
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.name}</p>
        </div>

        <div>
          <label>Email:</label>
          <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
