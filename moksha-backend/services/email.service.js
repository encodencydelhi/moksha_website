const nodemailer = require("nodemailer");
const Settings = require("../models/Settings.model");

const getTransporter = async () => {
  const settings = await Settings.findOne();
  const cfg = settings?.emailConfig;

  if (!cfg || !cfg.emailEnabled || !cfg.smtpHost) {
    return null;
  }

  return nodemailer.createTransport({
    host: cfg.smtpHost,
    port: cfg.smtpPort || 587,
    secure: cfg.smtpSecure || false,
    auth: { user: cfg.smtpUser, pass: cfg.smtpPass },
  });
};

const getFromAddress = async () => {
  const settings = await Settings.findOne();
  const cfg = settings?.emailConfig;
  return `"${cfg?.fromName || "Moksha Voyage"}" <${cfg?.fromEmail || "noreply@mokshavoyage.com"}>`;
};

const getAdminEmail = async () => {
  const settings = await Settings.findOne();
  return (
    settings?.emailConfig?.adminNotificationEmail || "admin@mokshavoyage.com"
  );
};

exports.sendEnquiryConfirmation = async (enquiry) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) return;

    const from = await getFromAddress();
    await transporter.sendMail({
      from,
      to: enquiry.email,
      subject: "We received your message - Moksha Voyage",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8dbc5;border-radius:8px;overflow:hidden;">
          <div style="background:#3A2A1F;padding:24px;text-align:center;">
            <h1 style="color:#E8DBC5;margin:0;font-size:22px;">🙏 Moksha Voyage</h1>
            <p style="color:#c9b696;margin:4px 0 0;font-size:13px;">Compassionate End-of-Life Guidance</p>
          </div>
          <div style="padding:32px;">
            <h2 style="color:#3A2A1F;font-size:18px;">Namaste ${enquiry.firstName},</h2>
            <p style="color:#5A4030;line-height:1.6;">Thank you for reaching out to us. We have received your message and our team will get back to you within 24 hours.</p>
            <div style="background:#F8F4EC;border-left:4px solid #8B6A3E;padding:16px;border-radius:4px;margin:20px 0;">
              <p style="margin:0;color:#5A4030;font-size:14px;"><strong>Your Message:</strong></p>
              <p style="margin:8px 0 0;color:#6B5040;font-size:14px;">${enquiry.message}</p>
            </div>
            <p style="color:#5A4030;line-height:1.6;">If you need immediate assistance, please call us or reach out via WhatsApp.</p>
            <p style="color:#8B6A3E;font-size:13px;margin-top:24px;">With compassion & care,<br/><strong>Moksha Voyage Team</strong></p>
          </div>
          <div style="background:#F8F4EC;padding:16px;text-align:center;border-top:1px solid #e8dbc5;">
            <p style="color:#8B7A6A;font-size:12px;margin:0;">© ${new Date().getFullYear()} Moksha Voyage • All rights reserved</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Enquiry confirmation email failed:", err.message);
  }
};

exports.sendAdminEnquiryNotification = async (enquiry) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) return;

    const from = await getFromAddress();
    const adminEmail = await getAdminEmail();

    await transporter.sendMail({
      from,
      to: adminEmail,
      subject: `🔔 New Enquiry from ${enquiry.firstName} - Moksha Voyage`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#3A2A1F;padding:20px;border-radius:8px 8px 0 0;">
            <h2 style="color:#E8DBC5;margin:0;">New Contact Enquiry</h2>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #e8dbc5;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;color:#8B7A6A;width:120px;"><strong>Name:</strong></td><td style="padding:8px;color:#3A2A1F;">${enquiry.firstName} ${enquiry.lastName}</td></tr>
              <tr style="background:#F8F4EC;"><td style="padding:8px;color:#8B7A6A;"><strong>Email:</strong></td><td style="padding:8px;color:#3A2A1F;">${enquiry.email}</td></tr>
              <tr><td style="padding:8px;color:#8B7A6A;"><strong>Phone:</strong></td><td style="padding:8px;color:#3A2A1F;">${enquiry.phone || "Not provided"}</td></tr>
              <tr style="background:#F8F4EC;"><td style="padding:8px;color:#8B7A6A;"><strong>Subject:</strong></td><td style="padding:8px;color:#3A2A1F;">${enquiry.subject || "General"}</td></tr>
              <tr><td style="padding:8px;color:#8B7A6A;"><strong>Service:</strong></td><td style="padding:8px;color:#3A2A1F;">${enquiry.serviceType || "N/A"}</td></tr>
              <tr style="background:#F8F4EC;"><td style="padding:8px;color:#8B7A6A;vertical-align:top;"><strong>Message:</strong></td><td style="padding:8px;color:#3A2A1F;">${enquiry.message}</td></tr>
              <tr><td style="padding:8px;color:#8B7A6A;"><strong>IP:</strong></td><td style="padding:8px;color:#999;">${enquiry.ipAddress}</td></tr>
              <tr style="background:#F8F4EC;"><td style="padding:8px;color:#8B7A6A;"><strong>Received:</strong></td><td style="padding:8px;color:#3A2A1F;">${new Date().toLocaleString("en-IN")}</td></tr>
            </table>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Admin enquiry notification email failed:", err.message);
  }
};

exports.sendPaymentConfirmation = async (payment) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) {
      console.log("Email service not configured, payment confirmation skipped");
      return;
    }

    const from = await getFromAddress();
    const serviceName = payment.service?.name || "Moksha Voyage Service";
    const amount = `₹${payment.amount || 0}`;

    await transporter.sendMail({
      from,
      to: payment.email,
      subject: "✓ Payment Confirmed - Moksha Voyage",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8dbc5;border-radius:8px;overflow:hidden;">
          <div style="background:linear-gradient(135deg, #3A2A1F 0%, #5A3E2B 100%);padding:32px;text-align:center;">
            <h1 style="color:#E8DBC5;margin:0;font-size:28px;">✓ Payment Confirmed</h1>
            <p style="color:#c9b696;margin:8px 0 0;font-size:14px;">Thank you for your trust</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#5A4030;font-size:16px;margin-bottom:24px;">Dear Valued Customer,</p>
            <p style="color:#5A4030;line-height:1.8;">Your payment has been successfully received and processed. Your service request is now confirmed.</p>
            
            <div style="background:#F8F4EC;border-left:4px solid #8B6A3E;padding:20px;border-radius:4px;margin:24px 0;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;width:140px;">Transaction ID:</td>
                  <td style="padding:8px;color:#3A2A1F;">${payment.transactionId}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Payment ID:</td>
                  <td style="padding:8px;color:#3A2A1F;">${payment.razorpayPaymentId || "Processing..."}</td>
                </tr>
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Amount Paid:</td>
                  <td style="padding:8px;color:#3A2A1F;font-size:18px;font-weight:bold;color:#8B6A3E;">${amount}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Service:</td>
                  <td style="padding:8px;color:#3A2A1F;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Date & Time:</td>
                  <td style="padding:8px;color:#3A2A1F;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Status:</td>
                  <td style="padding:8px;color:#2d5016;"><strong style="color:#27a745;">✓ Completed</strong></td>
                </tr>
              </table>
            </div>

            <div style="background:#f9f5f0;padding:16px;border-radius:4px;margin:24px 0;">
              <h3 style="color:#3A2A1F;margin-top:0;">What's Next?</h3>
              <ul style="color:#5A4030;line-height:1.8;margin:8px 0;padding-left:20px;">
                <li>Your service request has been activated</li>
                <li>Our team will contact you within 24 hours</li>
                <li>Keep this receipt for your records</li>
              </ul>
            </div>

            <p style="color:#5A4030;line-height:1.8;">If you have any questions or need further assistance, please don't hesitate to contact us.</p>
            
            <p style="color:#8B6A3E;font-size:13px;margin-top:32px;border-top:1px solid #e8dbc5;padding-top:16px;">
              With compassion & care,<br/>
              <strong>Moksha Voyage Team</strong><br/>
              <small style="color:#999;">24/7 Support Available</small>
            </p>
          </div>
          <div style="background:#F8F4EC;padding:16px;text-align:center;border-top:1px solid #e8dbc5;">
            <p style="color:#8B7A6A;font-size:12px;margin:0;">© ${new Date().getFullYear()} Moksha Voyage • All rights reserved</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Payment confirmation email failed:", err.message);
  }
};

exports.sendPaymentNotificationToAdmin = async (payment) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) return;

    const from = await getFromAddress();
    const adminEmail = await getAdminEmail();
    const serviceName = payment.service?.name || "Unknown Service";
    const amount = `₹${payment.amount || 0}`;

    await transporter.sendMail({
      from,
      to: adminEmail,
      subject: `🔔 New Payment Received - ${payment.notes?.name || "Customer"} (₹${payment.amount})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff;border:1px solid #e8dbc5;border-radius:8px;">
          <div style="background:#3A2A1F;padding:20px;color:#E8DBC5;">
            <h2 style="margin:0;">🔔 New Payment Received</h2>
          </div>
          <div style="padding:24px;">
            <div style="background:#F8F4EC;padding:16px;border-radius:4px;margin-bottom:20px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;width:150px;">Customer Name:</td>
                  <td style="padding:8px;color:#3A2A1F;">${payment.notes?.name || "N/A"}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Email:</td>
                  <td style="padding:8px;color:#3A2A1F;"><a href="mailto:${payment.email}" style="color:#8B6A3E;">${payment.email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Phone:</td>
                  <td style="padding:8px;color:#3A2A1F;">${payment.phone || "N/A"}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Amount Paid:</td>
                  <td style="padding:8px;color:#3A2A1F;font-size:16px;font-weight:bold;color:#27a745;">${amount}</td>
                </tr>
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Service:</td>
                  <td style="padding:8px;color:#3A2A1F;">${serviceName}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Transaction ID:</td>
                  <td style="padding:8px;color:#3A2A1F;font-family:monospace;">${payment.transactionId}</td>
                </tr>
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Payment ID:</td>
                  <td style="padding:8px;color:#3A2A1F;font-family:monospace;">${payment.razorpayPaymentId || "Processing"}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Status:</td>
                  <td style="padding:8px;color:#3A2A1F;"><strong style="color:#27a745;">✓ COMPLETED</strong></td>
                </tr>
                <tr>
                  <td style="padding:8px;color:#8B7A6A;font-weight:bold;">Received At:</td>
                  <td style="padding:8px;color:#3A2A1F;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                </tr>
              </table>
            </div>
            <div style="text-align:center;margin-top:20px;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/payments" style="display:inline-block;background:#8B6A3E;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;">View in Dashboard</a>
            </div>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Admin payment notification failed:", err.message);
  }
};

exports.testEmailConfig = async () => {
  try {
    const transporter = await getTransporter();
    if (!transporter)
      return { success: false, message: "Email not configured or disabled" };
    await transporter.verify();
    return { success: true, message: "Email configuration is valid" };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

exports.sendOtpEmail = async (to, otp) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) return;

    const from = await getFromAddress();
    await transporter.sendMail({
      from,
      to,
      subject: "Your OTP code for Moksha Voyage",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e8dbc5;border-radius:8px;">
          <h2 style="color:#3A2A1F;">Your Moksha Voyage OTP</h2>
          <p style="color:#5A4030;">Use the following code to complete verification:</p>
          <h1 style="color:#8B6A3E;letter-spacing:0.12em;">${otp}</h1>
          <p style="color:#5A4030;">This OTP is valid for 15 minutes.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("OTP mail error", err.message || err);
  }
};
