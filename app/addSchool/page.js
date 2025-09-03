"use client";  
// This tells Next.js that this page will run in the browser (client side) 
// instead of only on the server. Forms need client-side interactivity.

import { useForm } from "react-hook-form"; 
// react-hook-form is used to easily create and validate forms

import { useState } from "react"; 
// useState is a React hook that helps us store and show messages (like success/error)

export default function AddSchool() {
  // Setup react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Message state for showing API response
  const [message, setMessage] = useState("");

  // Function runs when form is submitted
  const onSubmit = async (data) => {
    // Create a FormData object to send text + file data
    const formData = new FormData();

    // Append all form values (name, address, etc.)
    for (const key in data) {
  if (key === "image") {
    formData.append("image", data.image[0]);
  } else {
    formData.append(key, data[key]);
  }
}
    // Send the form data to backend API (/api/addSchool)
    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });

   // Get the API response as JSON
const result = await res.json();

// Show success OR error
if (res.ok) {
  setMessage(result.message);
} else {
  setMessage(result.error || "Something went wrong");
}
  };

  return (
  <div className="form-container">
    <h1>Add School</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="School Name" />
      {errors.name && <p>Name is required</p>}

      <input {...register("address", { required: true })} placeholder="Address" />
      {errors.address && <p>Address is required</p>}

      <input {...register("city", { required: true })} placeholder="City" />
      {errors.city && <p>City is required</p>}

      <input {...register("state", { required: true })} placeholder="State" />
      {errors.state && <p>State is required</p>}

      <input {...register("contact", { required: true })} placeholder="Contact Number" />
      {errors.contact && <p>Contact is required</p>}

      <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
      {errors.email_id && <p>Valid email required</p>}

      <input type="file" {...register("image", { required: true })} />
      {errors.image && <p>Image is required</p>}

      <button type="submit">Submit</button>
    </form>

    {message && <p>{message}</p>}
  </div>
);
}