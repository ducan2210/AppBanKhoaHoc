using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.ClassSupport;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhGiaController : ControllerBase
    {

        private readonly DB_QLKHOAHOCContext db;
        public DanhGiaController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        [HttpPost]
        [Route("them-danh-gia")]
        public IActionResult taoDanhGia(string maHV, string maKH, string noiDung, int soSao)
        {
            DanhGiaKhoaHoc newDanhGia = new DanhGiaKhoaHoc();
            newDanhGia.MaDanhGia = TaoMaTuDong.GenerateRandomCode("DG");
            newDanhGia.MaHv = maHV;
            newDanhGia.MaKh = maKH;
            newDanhGia.NoiDung = noiDung;
            newDanhGia.SoSao = soSao;
            newDanhGia.NgayDg = DateTime.Now;
            db.DanhGiaKhoaHocs.Add(newDanhGia);
            int check = db.SaveChanges();
            if (check > 0)
            {
                return Ok(new { status = "Succes", message = "Đánh giá khóa học thành công" });
            }
            return Ok(new { status = "Error", message = "Đánh giá khóa học thất bại" });
        }

    }
}
