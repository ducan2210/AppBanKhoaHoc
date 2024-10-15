using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.ClassSupport;
using Server_WebBanKhoaHoc.Models;
using Server_WebBanKhoaHoc.ModelsVnPay;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly DB_QLKHOAHOCContext db;
        public HoaDonController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }



        [HttpGet]
        [Route("lay-danh-sach-hoa-don-mua-khoa-hoc")]
        public IActionResult layDanhSachHoaDonMuaKhoaHoc(string maHv)
        {
            var hoaDon = db.HoaDons.Where(t => t.MaHv == maHv).ToList();

            var dsHoaDon = new List<object>();
            if(hoaDon != null)
            {
                foreach(var item in hoaDon)
                {
                    var hd = new
                    {
                        maHd = item.MaHd,
                       
                        tongTien = item.TongTien,
                        ngayThanhToan = FormatDate.FmDateTime(item.NgayThanhToan)
                    };
                    dsHoaDon.Add(hd);
                }
                return Ok(dsHoaDon);
            }
            return Ok(dsHoaDon);
        }


        [HttpGet]
        [Route("lay-danh-sach-chi-tiet-hoa-don-mua-khoa-hoc")]
        public IActionResult layDanhSachChiTietHoaDonMuaKhoaHoc(string maHd)
        {

            var ctHd = db.ChiTietHoaDons.Where(t => t.MaHd == maHd).ToList();
            var dsKh = new List<object>();
            if (ctHd != null)
            {
                
                foreach (var item in ctHd)
                {
                    var khoaHoc = new
                    {
                        hinhAnh = db.KhoaHocs.Where(t => t.MaKh == item.MaKh).Select(t => t.Hinh).FirstOrDefault(),
                        tenKh = db.KhoaHocs.Where(t => t.MaKh == item.MaKh).Select(t => t.TenKh).FirstOrDefault(),
                        tenGv = db.KhoaHocs.Where(t => t.MaKh == item.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault(),
                        donGia = item.DonGia
                    };
                    dsKh.Add(khoaHoc);
                }
                return Ok(dsKh);
            }    
            
            return Ok(dsKh);

            
        }



    }
}
