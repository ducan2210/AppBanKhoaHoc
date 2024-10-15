using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
namespace Server_WebBanKhoaHoc.ClassSupport
{
    public class SendEmail
    {
        public static void guiEmail(string emailTo, string text)
        {
            // Thông tin tài khoản email của bạn
            string emailFrom = "longbachnguyen09dev@gmail.com";
            string password = "ybpqdhxhcpsudgth";

            // Thông tin người nhận email

            // Tạo đối tượng MimeMessage
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("Your Name", emailFrom));
            message.To.Add(new MailboxAddress("Recipient Name", emailTo));
            message.Subject = "Subject of the email";

            // Tạo đối tượng TextPart với nội dung của email
            TextPart textPart = new TextPart("html")
            {
                Text = text
            };

            // Thêm TextPart vào MimeMessage
            message.Body = textPart;

            // Cấu hình thông tin máy chủ SMTP
            using (SmtpClient client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate(emailFrom, password);

                // Gửi email
                client.Send(message);
                client.Disconnect(true);
            }

            Console.WriteLine("Email sent successfully.");
        }
        
    }
}
