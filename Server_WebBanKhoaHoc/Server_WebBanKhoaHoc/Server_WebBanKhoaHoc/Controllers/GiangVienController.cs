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
    public class GiangVienController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;

        public GiangVienController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-thong-tin-giang-vien-theo-ma")]
        public IActionResult layThongTinGiangVienTheoMa(string maGV)
        {
            var giangVien = db.GiangViens.Where(t => t.MaGv == maGV).FirstOrDefault();
            if (giangVien != null)
            {
                var listKH = db.KhoaHocs.Where(t => t.MaGv == giangVien.MaGv).ToList();
                int soHocVien = 0;
                int? tong = 0;
                int dem = 0;
                double trungBinhSao = 0;
                var dsKhoaHoc = new List<object>();

                foreach (var item in listKH)
                {
                    var danhGias = db.DanhGiaKhoaHocs.Where(t => t.MaKh == item.MaKh).ToList();
                    soHocVien += db.KhoaHocDaMuas.Count(t => t.MaKh == item.MaKh);
                    if (danhGias.Count != 0)
                    {
                        foreach (var dg in danhGias)
                        {
                            tong += dg.SoSao;
                            dem++;
                        }
                        trungBinhSao = (double)tong / dem;
                        trungBinhSao = Math.Round(trungBinhSao, 2); // Làm tròn đến 2 chữ số thập phân
                        var khoaHoc = new
                        {
                            maKh = item.MaKh,
                            hinhAnh = item.Hinh,
                            tenKh = item.TenKh,
                            tongSao = trungBinhSao,
                            donGia = item.Gia,
                            tongDg = danhGias.Count,
                            //giaGiam = kh.GiaDaGiam,
                        };
                        dsKhoaHoc.Add(khoaHoc);
                        tong = 0;
                        dem = 0;
                    }
                    else
                    {
                        var khoaHoc = new
                        {
                            maKh = item.MaKh,
                            hinhAnh = item.Hinh,
                            tenKh = item.TenKh,
                            tongSao = trungBinhSao,
                            donGia = item.Gia,
                            tongDg = danhGias.Count,
                            //giaGiam = kh.GiaDaGiam,
                        };
                        dsKhoaHoc.Add(khoaHoc);
                    }
                }
                
                var newgv = new
                {
                    maGv = giangVien.MaGv,
                    hoTen = giangVien.TenGv,
                    avt = giangVien.Avata,
                    dskh = dsKhoaHoc,
                    soHv= soHocVien,
                    soKh = dsKhoaHoc.Count,
                    
                };
                return Ok(newgv);
            }
            return Ok(new { status = "Error" });
        }
    }
}
