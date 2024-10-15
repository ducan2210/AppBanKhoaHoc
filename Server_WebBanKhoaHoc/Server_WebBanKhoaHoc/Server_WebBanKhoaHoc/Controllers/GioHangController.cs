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
    public class GioHangController : ControllerBase
    {
        private readonly DB_QLKHOAHOCContext db;
        public GioHangController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }





        [HttpGet]
        [Route("lay-chi-tiet-gio-hang-theo-ma-hoc-vien")]
        public IActionResult layDanhSachKhoaHocTrongGioHang(string maHV)
        {
            var gioHangs = db.GioHangs.Where(t => t.MaHv == maHV).FirstOrDefault();
            var dsKhoaHoc = new List<object>();
            if (gioHangs != null)
            {
                var ctghs = db.ChiTietGioHangs.Where(t => t.MaGh == gioHangs.MaGh).ToList();
                if (ctghs != null)
                {
                    foreach (var ct in ctghs)
                    {
                        var kh = db.KhoaHocs.Where(t => t.MaKh == ct.MaKh).FirstOrDefault();
                        var gv = db.GiangViens.Where(t => t.MaGv == kh.MaGv).FirstOrDefault();
                        var khoaHoc = new
                        {
                            maGh = gioHangs.MaGh,
                            maKh = kh.MaKh,
                            hinhAnh = kh.Hinh,
                            tenKh = kh.TenKh,
                            giaGoc = kh.Gia,
                            donGia = ct.DonGia,
                            tenGv = gv.TenGv,
                            avt = gv.Avata,
                        };

                        dsKhoaHoc.Add(khoaHoc);
                    }
                }
            }
            return Ok(dsKhoaHoc);
        }


        [HttpDelete]
        [Route("xoa-ctgh")]
        public IActionResult xoaCTGH(string maGh, string maKh)
        {
            // Kiểm tra xem mục giỏ hàng có tồn tại không
            var checkGH = db.ChiTietGioHangs.Where(t => t.MaGh == maGh && t.MaKh == maKh).FirstOrDefault();
            if (checkGH != null)
            {
                try
                {
                    // Xóa mục giỏ hàng
                    db.ChiTietGioHangs.Remove(checkGH);

                    // Lưu thay đổi vào cơ sở dữ liệu
                    db.SaveChanges();

                    // Trả về kết quả thành công
                    return Ok(new { status = "Success", message = "Xóa thành công" });
                }
                catch (Exception ex)
                {
                    // Xử lý lỗi trong quá trình xóa
                    return Ok(new { status = "Error", message = "Lỗi trong quá trình xóa: " + ex.Message });
                }
            }
            else
            {
                // Mục giỏ hàng không tồn tại
                return Ok(new { status = "Error", message = "Mục giỏ hàng không tồn tại" });
            }
        }


        [HttpPost]
        [Route("them-gio-hang")]
        public IActionResult themGioHang(string maHV, string maKH)
        {
            var checkKh = db.KhoaHocDaMuas.Where(t => t.MaKh == maKH && t.MaHv == maHV).FirstOrDefault();
            var checkGio = db.GioHangs.Where(t => t.MaHv == maHV).FirstOrDefault();
            if (checkKh == null)
            {
                if (checkGio == null)
                {
                    // tao gio moi
                    GioHang newGioHang = new GioHang();
                    newGioHang.MaGh = TaoMaTuDong.GenerateRandomCode("GH");
                    newGioHang.MaHv = maHV;
                    newGioHang.TongTien = 0;
                    db.GioHangs.Add(newGioHang);
                    db.SaveChanges();

                    // tien hanh them  ct gio hang
                    var ktr = themCtGioHang(newGioHang, maKH);
                    if (ktr == true)
                    {
                        return Ok(new { status = "Succes", message = "Thêm khóa học vào giỏ thành công" });
                    }
                    else
                    {
                        return Ok(new { status = "Error", message = "Khóa học đã có trong giỏ" });
                    }

                }
                else
                {
                    // tien hanh them  ct gio hang
                    var ktr = themCtGioHang(checkGio, maKH);
                    if (ktr == true)
                    {
                        return Ok(new { status = "Succes", message = "Thêm khóa học vào giỏ thành công" });

                    }
                    else
                    {
                        return Ok(new { status = "Error", message = "Khóa học đã có trong giỏ" });
                    }
                }
            }
            else
            {
                return Ok(new { status = "Error", message = "Bạn đã mua khoá học này rồi!" });
            }


        }

        [HttpDelete]
        [Route("xoa-ct-gio-hang")]
        public IActionResult xoaGioHang(string maKh)
        {
            var check = db.ChiTietGioHangs.Where(t => t.MaKh == maKh).FirstOrDefault();
            if (check != null)
            {
                db.ChiTietGioHangs.Remove(check);
                int ktr = db.SaveChanges();
                if (ktr > 0)
                {
                    return Ok(new { status = "Succes", message = "Xóa khóa học khỏi giỏ thành công" });
                }
            }
            return Ok(new { status = "Error", message = "Xóa khóa học khỏi giỏ thất bại" });
        }


        private bool themCtGioHang(GioHang gioHang, string maKH)
        {

            var checkKhDaThem = db.ChiTietGioHangs.Where(t => t.MaKh == maKH && t.MaGh == gioHang.MaGh).FirstOrDefault();
            var kh = db.KhoaHocs.Where(t => t.MaKh == maKH).FirstOrDefault();
            var donGia = kh.Gia;
            if (checkKhDaThem != null)
            {
                return false;
            }
            else
            {
                ChiTietGioHang newCt = new ChiTietGioHang();
                newCt.MaGh = gioHang.MaGh;
                newCt.MaKh = maKH;
                newCt.DonGia = donGia;
                db.ChiTietGioHangs.Add(newCt);
                var ktr = db.SaveChanges();
                if (ktr > 0)
                {
                    return true;
                }

                return false;

            }
        }
    }
}
