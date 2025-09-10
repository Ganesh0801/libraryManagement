const forgetMailContent = (otp)=> `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h2 style="color: #007bff;">Password Reset OTP</h2>
    <p>Dear user,</p>
    <p>You requested to reset your password. Use the following OTP to proceed:</p>
    <div style="
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      font-size: 24px;
      letter-spacing: 4px;
      background-color: #f0f0f0;
      border-radius: 8px;
      font-weight: bold;
      color: #000;
    ">
      ${otp}
    </div>
    <p style="font-size: 14px; color: #666;">
      This OTP is valid for 15 minutes. Please do not share it with anyone.
    </p>
    <p>Regards,<br/>Your Company Team</p>
  </div>
`;

module.exports = forgetMailContent;