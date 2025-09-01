import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail', // You can change this to your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw error to prevent app crashes, just log it
    return null;
  }
};

// Email templates
export const emailTemplates = {
  smeInterest: (event, sme, institution) => ({
    subject: `New SME Interest: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New SME Interest for Your Event</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">${event.title}</h3>
          <p><strong>Topic:</strong> ${event.topic}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>

        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">SME Details</h3>
          <p><strong>Name:</strong> ${sme.name}</p>
          <p><strong>Email:</strong> ${sme.email}</p>
          <p><strong>Expertise:</strong> ${sme.expertise.join(', ')}</p>
          <p><strong>Qualifications:</strong> ${sme.qualifications.join(', ')}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/dashboard/interests"
             style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Review Application
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">
          This is an automated message from MeetsApp. Please do not reply to this email.
        </p>
      </div>
    `
  }),

  interestApproved: (event, institution, message) => ({
    subject: `Your Event Application Approved: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #27ae60;">Application Approved! 🎉</h2>

        <div style="background: #d5f4e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">${event.title}</h3>
          <p><strong>Topic:</strong> ${event.topic}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Institution Details</h3>
          <p><strong>Institution:</strong> ${institution.name}</p>
          <p><strong>Email:</strong> ${institution.email}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        </div>

        <p style="font-size: 16px; color: #2c3e50;">
          Congratulations! Your application has been approved. Please check your dashboard for further details and next steps.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/dashboard"
             style="background: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Dashboard
          </a>
        </div>
      </div>
    `
  }),

  interestRejected: (event, institution, message) => ({
    subject: `Event Application Update: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e74c3c;">Application Status Update</h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">${event.title}</h3>
          <p><strong>Topic:</strong> ${event.topic}</p>
          <p><strong>Date:</strong> ${event.date}</p>
        </div>

        <div style="background: #ffeaea; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c;">
          <h3 style="margin-top: 0; color: #2c3e50;">Application Status: Rejected</h3>
          <p>Unfortunately, your application for this event was not approved at this time.</p>
          ${message ? `<p><strong>Message from Institution:</strong> ${message}</p>` : ''}
        </div>

        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Institution Details</h3>
          <p><strong>Institution:</strong> ${institution.name}</p>
          <p><strong>Email:</strong> ${institution.email}</p>
        </div>

        <p style="font-size: 16px; color: #2c3e50;">
          Don't be discouraged! You can apply for other events that match your expertise.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/dashboard"
             style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Browse More Events
          </a>
        </div>
      </div>
    `
  }),

  interestOnHold: (event, institution, message) => ({
    subject: `Event Application On Hold: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f39c12;">Application Status: On Hold</h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">${event.title}</h3>
          <p><strong>Topic:</strong> ${event.topic}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>

        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f39c12;">
          <h3 style="margin-top: 0; color: #2c3e50;">Application Status: On Hold</h3>
          <p>Your application is currently on hold. The institution may need additional information or is considering your application for a standby position.</p>
          ${message ? `<p><strong>Message from Institution:</strong> ${message}</p>` : ''}
        </div>

        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Institution Details</h3>
          <p><strong>Institution:</strong> ${institution.name}</p>
          <p><strong>Email:</strong> ${institution.email}</p>
        </div>

        <p style="font-size: 16px; color: #2c3e50;">
          Please stay tuned for updates. You may be contacted for additional information or confirmation.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/dashboard"
             style="background: #f39c12; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Check Status
          </a>
        </div>
      </div>
    `
  })
};
