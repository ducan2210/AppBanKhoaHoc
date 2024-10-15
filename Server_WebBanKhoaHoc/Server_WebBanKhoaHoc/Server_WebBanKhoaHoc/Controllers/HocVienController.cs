using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
using Firebase.Storage;
using System.IO;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HocVienController : ControllerBase
    {
        private readonly DB_QLKHOAHOCContext db;
        public HocVienController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        [HttpGet]
        [Route("lay-danh-sach-hoc-vien")]
        public IActionResult layDanhSachGiangVien()
        {
            var dsHocVien = db.HocViens.Where(t => true).ToList();
            if (dsHocVien == null)
            {
                return Ok(new { status = "Error ss" });
            }
            return Ok(dsHocVien);
        }


        [HttpGet]
        [Route("lay-thong-tin-hoc-vien-theo-mahv")]
        public IActionResult layThongTinHocVien(string maHv)
        {
            var dsHocVien = db.HocViens.Where(t => t.MaHv == maHv).FirstOrDefault();
            if (dsHocVien == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(dsHocVien);
        }

        [HttpPut]
        [Route("chinh-sua-thong-tin-ca-nhan-appMobile")]
        public IActionResult chinhSuaThongTinCaNhan(string maHv, string tenHV, string sdt, DateTime ngaySinh)
        {
            var hocVien1 = db.HocViens.Where(t => t.MaHv == maHv).FirstOrDefault();
            var hocVien2 = db.HocViens.Where(t => t.MaHv != maHv && t.Sdt == sdt).FirstOrDefault();
            if (hocVien1 != null && hocVien2 == null)
            {
                hocVien1.HoTen = tenHV;
                if (sdt == null || sdt == "" || sdt == "null")
                {
                    sdt = "";
                }
                if (hocVien1.Sdt != sdt)
                {
                    hocVien1.Sdt = sdt;
                }
                hocVien1.NgaySinh = ngaySinh;
                var check = db.SaveChanges();
                if (check > 0)
                {
                    return Ok(new { status = "Succes", message = "Chỉnh sửa thông tin thành công!" });
                }
                else
                {
                    return Ok(new { status = "Error", message = "Chỉnh sửa thông tin không thành công!" });
                }
            }
            else if (hocVien1 != null && hocVien2 != null)
            {
                return Ok(new { status = "Error", message = "Số điện thoại đã được đăng ký, vui lòng chọn số khác!" });
            }
            return Ok(new { status = "Error", message = "Chỉnh sửa thông tin không thành công!" });
        }

        public class HocVienDTO
        {
            public string maHv { get; set; }
            public IFormFile avata { get; set; }
        }

        [HttpPut]
        [Route("cap-nhat-anh-dai-dien-appMobile")]
        public async Task<IActionResult> CapNhatAnhDaiDien([FromForm] HocVienDTO a)
        {
            if (a.avata == null || a.avata.Length == 0)
            {
                return BadRequest("File không tồn tại hoặc trống.");
            }

            var hocVien = db.HocViens.FirstOrDefault(t => t.MaHv == a.maHv);
            if (hocVien == null)
            {
                return NotFound("Học viên không tồn tại.");
            }
            string folderName = a.maHv + "/info_Hv";

            string url = await upLoadImg_Storage(a.avata, folderName, a.maHv);

            // Cập nhật đường dẫn ảnh đại diện của học viên
            hocVien.Avata = url;
            db.SaveChanges();

            return Ok(new { status = "Success", message = "Cập nhật ảnh đại diện thành công." });
        }



        public static async Task<string> upLoadImg_Storage(IFormFile imageFile, string folderName, string nameFile)
        {

            // Khởi tạo FirebaseStorage với tên bucket của Firebase Storage

            var storage = new FirebaseStorage("app-e-learning-3f826.appspot.com");

            // Đọc dữ liệu của ảnh vào một mảng byte
            using (var memoryStream = new MemoryStream())
            {
                await imageFile.CopyToAsync(memoryStream);
                byte[] imageBytes = memoryStream.ToArray();

                // Lấy tên tệp gốc từ IFormFile
                string fileName = Path.GetFileName(imageFile.FileName);
                string path = $"{folderName}/{nameFile}.jpg";

                // Tạo một MemoryStream từ mảng byte
                using (var imageStream = new MemoryStream(imageBytes))
                {
                    // Tải ảnh lên Firebase Storage
                    var uploadTask = await storage.Child(path).PutAsync(imageStream);

                    // Lấy URL của ảnh đã tải lên
                    string imageUrl = await storage.Child(path).GetDownloadUrlAsync();

                    return imageUrl;
                }
            }


        }


        [HttpGet]
        [Route("lay-thong-tin-tai-khoan-hoc-vien")]
        public IActionResult layThongTinTaiKhoanHocVien(string maHv)
        {
            var manD = db.HocViens.Where(t => t.MaHv == maHv).Select(t => t.MaNg).FirstOrDefault();
            var taiKhoanHocVien = db.NguoiDungs.Where(t => t.MaNg == manD).FirstOrDefault();
            if (taiKhoanHocVien == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(taiKhoanHocVien);
        }

    }
}
