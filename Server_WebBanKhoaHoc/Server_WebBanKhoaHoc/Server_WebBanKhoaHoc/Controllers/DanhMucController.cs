using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
using Server_WebBanKhoaHoc.ClassSupport;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {

        public readonly DB_QLKHOAHOCContext db;

        public DanhMucController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-danh-sach-danh-muc")]
        public IActionResult layDanhSachDanhMuc()
        {
            var dsDanhMuc = db.DanhMucs.Where(t => true).ToList();
            if (dsDanhMuc == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(dsDanhMuc);
        }

        [HttpPost]
        [Route("them-danh-muc")]
        public IActionResult themDanhMuc(string tenDanhMuc)
        {
            DanhMuc newDm = new DanhMuc();
            newDm.MaDm = TaoMaTuDong.GenerateRandomCode("DM");
            newDm.TenDm = tenDanhMuc;
            db.DanhMucs.Add(newDm);
            db.SaveChanges();
            return Ok(new { status = "Succes", message = "Thêm danh mục thành công" });
        }
    }
}
