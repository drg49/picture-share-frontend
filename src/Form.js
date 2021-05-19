import { useState } from "react"

const Form = (props) => {
    const [formData, setFormData] = useState(props.post)

    //FUNCTIONS
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent Form from Refreshing
        props.handleSubmit(formData); // Submit to Parents desired function
        props.history.push("/"); //Push back to display page
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Location Name"
          />
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="Img URL"
          />
          <input
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Description"
          />
          <input type="submit" value={props.label} />
        </form>
      );

}

export default Form