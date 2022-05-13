import React, { useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();

    if (email === "") {
      console.log("email required");
      return toast.warn("Email is required");
    }

    if (message === "") {
      return toast.warn("Please ,type a message");
    }

    emailjs
      .sendForm(
        "service_yvsqs3h",
        "template_eqz4isq",
        form.current,
        "CNRPI-Jv321N9ICWe"
      )
      .then(
        (result) => {
          toast.success("Email sent successfuly");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          toast.error("Something went wrong");
        }
      );
  };
  return (
    <div className="contactContainer">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <fieldset>
        <legend>Contact Us:</legend>

        <form onSubmit={sendEmail} ref={form} className="form">
          <div>
            <label htmlFor="">Full Name</label>
            <input type="text" name="user_name" placeholder="your name" />
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="your email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              name="user_phone"
              placeholder="your phone number"
            />
          </div>

          <div>
            <label htmlFor="">Message</label>
            <textarea
              name="message"
              id=""
              placeholder="Message"
              onChange={(e) => setmessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default Contact;
