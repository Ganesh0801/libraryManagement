import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendMail.js";
import { User } from "../models/userModel.js";

export const notifyUsers = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("SCHEDULING..");
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: {
          $lt: oneDayAgo,
        },
        returnDate: null,
        notified: false,
      });
      for (const element of borrowers) {
        if (element.user && element.user.email) {
          const user = await User.findById(element.user.id);
          sendEmail({
            email: email.user.email,
            subject: "Book Return Reminder",
            message: `Hello ${element.user.name},\n\nThis is a reminder that the book you borrowed is due for return today . Please return the book to the library as soon as possible.\n\nThanks. `,
          });
          element.notified = true;
          await element.save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
