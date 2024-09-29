const nodemailer = require("nodemailer");

const send_email = (email, subject, h1, msg) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codewithease7@gmail.com",
        pass: "kaqoftsswpzeaucf",
      },
    });
    const mailOptions = {
      from: "codewithease7@gmail.com",
      to: email,
      subject: subject,
      html: `
        <h1>${h1}</h1>
        <h3>${msg}</h3>
        `,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendResultEmail = (
  email,
  studentName,
  hackathonName,
  obtainedMarks,
  level,
  levelProgress
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codewithease7@gmail.com",
        pass: "kaqoftsswpzeaucf",
      },
    });

    const mailOptions = {
      from: "RESULT codewithease7@gmail.com",
      to: email,
      subject: `Hackathon Result for ${hackathonName}`,
      html: `
        <h1>Dear ${studentName},</h1>
        <p>Congratulations on completing the <strong>${hackathonName}</strong> hackathon!</p>
        <p>Here are your results:</p>
        <ul>
          <li><strong>Obtained Marks:</strong> ${obtainedMarks} / 100</li>
          <li><strong>Current Level:</strong> ${level}</li>
          <li><strong>Level Progress:</strong> ${levelProgress}%</li>
        </ul>
        <p>Keep up the great work and continue to improve your skills!</p>
        <p>Best regards,<br>Team Code-With-Ease</p>
      `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.error("Error in sendResultEmail function:", error);
  }
};

module.exports = { send_email, sendResultEmail };
