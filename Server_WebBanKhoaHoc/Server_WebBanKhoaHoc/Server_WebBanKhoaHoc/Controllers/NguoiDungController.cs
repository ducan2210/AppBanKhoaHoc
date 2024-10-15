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
    public class NguoiDungController : ControllerBase
    {

        public readonly DB_QLKHOAHOCContext db;
        public NguoiDungController (DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }


        //[HttpGet]
        //[Route("lay-thong-tin-nguoi-dung")]
        //public IActionResult




        // tao tai khoan hoc vien
        [HttpPost]
        [Route("tao-tai-khoan-hoc-vien-bang-email-appMobile")]
        public IActionResult taoTaiKhoanHocVienEmail(string email, string mk, string tenHV, DateTime ngaySinh)
        {
            
            // kiem tra xem co ten nguoi dung chua
            var check = db.NguoiDungs.Any(t => t.TenDn == email);
            if (check == false)
            {
                NguoiDung newND = new NguoiDung();
                newND.MaNg = TaoMaTuDong.radomMaTuDong("HV");
                while (MaDaTonTai(newND.MaNg))
                {
                    // Nếu mã đã tồn tại, tạo mới mã
                    newND.MaNg = TaoMaTuDong.radomMaTuDong("HV");
                }
                newND.TenDn = email;
                newND.MatKhau = mk;
                newND.MaVt = "VTHV";
                newND.TrangThai = "Đã duyệt";
                db.NguoiDungs.Add(newND);
                HocVien newhocVien = new HocVien();
                newhocVien.MaHv = TaoMaTuDong.radomMaTuDong("HV");
                while (MaHVDaTonTai(newhocVien.MaHv))
                {
                    // Nếu mã đã tồn tại, tạo mới mã
                    newhocVien.MaHv = TaoMaTuDong.radomMaTuDong("HV");
                }
                newhocVien.MaNg = newND.MaNg;
                newhocVien.HoTen = tenHV;
                newhocVien.Email = email;
                newhocVien.NgaySinh = ngaySinh;
                db.HocViens.Add(newhocVien);
                var checkAdd = db.SaveChanges();
                if(checkAdd > 0)
                {
                    return Ok(new { message = "Succes" });
                }
            }
            return Ok(new { message = "Error" });
        }


        //// tao tai khoan hoc vien
        //[HttpPost]
        //[Route("tao-tai-khoan-hoc-vien-bang-gg")]
        //public IActionResult taoTaiKhoanHocVienGG(string email, string tenHV)
        //{

        //    var check = db.NguoiDungs.Any(t => t.TenDn == email);
        //    if (check == false)
        //    {
        //        NguoiDung newND = new NguoiDung();
        //        newND.MaNg = TaoMaTuDong.GenerateRandomCode("ND");
        //        newND.TenDn = email;
        //        newND.MaVt = "VTQ93";
        //        db.NguoiDungs.Add(newND);
        //        var checkAdd = db.SaveChanges();
        //        if (checkAdd > 0)
        //        {
        //            themHocVien(newND.MaNg, tenHV, email);
        //            return Ok(new { message = "Succes", maND = newND.MaNg, tenHV = tenHV });
        //        }
        //    }
        //    return Ok(new { message = "Error" });
        //}


        [HttpGet]
        [Route("dang-nhap-tai-khoan-hoc-vien-moi-cua-an")]
        public IActionResult dangNhapTaiKhoanHocVienMoiCuaAn(string email, string mk)
        {
            var checkDangNhap = db.NguoiDungs.Where(t => t.TenDn == email).FirstOrDefault();
            if (checkDangNhap != null)
            {
                if (checkDangNhap.MatKhau == mk && checkDangNhap.MaVt == "VTHV")
                {
                    var thongTinHV = db.HocViens.Where(t => t.MaNg == checkDangNhap.MaNg).FirstOrDefault();
                    return Ok(new
                    {
                        message = "Succes",
                        maHV = thongTinHV.MaHv,
                        tenHV = thongTinHV.HoTen,
                        trangThai = checkDangNhap.TrangThai
                    });
                }
            }
            return Ok(new { message = "Error" });
        }

        //[HttpGet]
        //[Route("dang-nhap-tai-khoan-hoc-vien-bang-gg")]
        //public IActionResult dangNhapBangGG(string email)
        //{
        //    var checkDangNhap = db.NguoiDungs.Where(t => t.TenDn == email).FirstOrDefault();
        //    if(checkDangNhap != null)
        //    {
        //        var thongTinHV = db.HocViens.Where(t => t.MaNd == checkDangNhap.MaNd).FirstOrDefault();
        //        return Ok(new { message = "Succes", maHV = thongTinHV.MaHv, tenHV = thongTinHV.TenHv });
        //    }
        //    return Ok(new { message = "Error" });

        //}

        private bool MaDaTonTai(string maNd)
        {
            return db.NguoiDungs.Any(t => t.MaNg == maNd);
        }
        private bool MaHVDaTonTai(string mahv)
        {
            return db.HocViens.Any(t => t.MaHv == mahv);
        }

        
    }
}
