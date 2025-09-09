import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.get("/home", (req, res) => {
    res.render("listings/home.ejs");
});

router.route("/contact-us")
  .get((req, res) => {
    res.render("listings/contact-us.ejs");
  })

  .post((req, res) => {
    const { firstName, lastName, email, number, msg } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "roaderz99@gmail.com",
        pass: "jzpd dkym efsf stxz", // App Password
      },
    });

    const mailOptions = {
      from: email,
      to: "roaderz99@gmail.com",
      subject: `Message from ${firstName} ${lastName}`,
      text: `Email: ${email}\n\nContact Number: ${number}\n\n\nMessage:\n${msg}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Something went wrong!");
      }
      req.flash("success","Your message has been delivered.Thanks for contacting us")
      res.redirect("/contact-us");
    });
  });

export default router;
