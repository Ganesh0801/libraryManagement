export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #1a1a1a;">
    <h2 style="color: #fff; text-align: center;">Verify Your Email Address</h2>

    <p style="font-size: 16px; color: #ccc;">Dear User,</p>
    <p style="font-size: 16px; color: #ccc;">
      To complete your registration or login, please use the following code:
    </p>

    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #000; background: #fff; padding: 10px 20px; border-radius: 6px;">
        ${otpCode}
      </span>
    </div>

    <p style="font-size: 16px; color: #ccc;">
      This code is valid for 15 minutes. Please do not share this code with anyone.
    </p>
    <p style="font-size: 16px; color: #ccc;">
      If you did not request this email, please ignore it.
    </p>

    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
      <p>Thank you, <br>Bookworm Team</p>
      <p style="font-size: 12px; color: #444;">
        This is an automated message. Please do not reply to this email.
      </p>
    </footer>
  </div>
    `;
}

export function generateForgetPasswordEmailTemplate(resetPasswordUrl) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #1a1a1a;">
  <h2 style="color: #fff; text-align: center;">Reset Your Password</h2>

  <p style="font-size: 16px; color: #ccc;">Dear User,</p>
  <p style="font-size: 16px; color: #ccc;">
    We received a request to reset your password. Please use the following code to proceed:
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #000; background: #fff; padding: 10px 20px; border-radius: 6px;">
      ${resetPasswordUrl}
    </span>
  </div>

  <p style="font-size: 16px; color: #ccc;">
    This code is valid for 15 minutes. Do not share this code with anyone.
  </p>
  <p style="font-size: 16px; color: #ccc;">
    If you did not request a password reset, you can safely ignore this message.
  </p>

  <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
    <p>Thank you, <br>Bookworm Team</p>
    <p style="font-size: 12px; color: #444;">
      This is an automated message. Please do not reply to this email.
    </p>
  </footer>
</div>

  `;
}
