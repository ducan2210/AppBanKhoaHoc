using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanKhoaHoc.ClassSupport
{
    public class TaoMaTuDong
    {

        private  DB_QLKHOAHOCContext db;
        public TaoMaTuDong(DB_QLKHOAHOCContext dbContext)
        {
            db = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }   

        public TaoMaTuDong ()
        {

        }

        public static string radomMaTuDong(string tienTo)
        {
            Random random = new Random();
        
            // Tạo một ký tự ngẫu nhiên (trong khoảng 'A' đến 'Z')
            char randomChar = (char)('A' + random.Next(26));

            // Tạo một số ngẫu nhiên (trong khoảng từ 1 đến 999)
            int randomNumber = random.Next(1, 1000);

            // Tạo chuỗi ngẫu nhiên
            string randomString = tienTo + $"{randomChar}{randomNumber:D3}";
    
            return randomString;
        }


        // tao ma tu dong v2
        public static string GenerateRandomCode(string prefix)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] randomBytes = new byte[4]; // Độ dài của mã ngẫu nhiên
                rng.GetBytes(randomBytes);

                int randomInt = BitConverter.ToInt32(randomBytes, 0);

                // Chuyển đổi số nguyên thành chuỗi để lưu vào cơ sở dữ liệu và thêm tiền tố
                return prefix + Math.Abs(randomInt).ToString();
            }
        }


    }
}
