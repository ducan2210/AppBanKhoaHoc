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
    public class KhoaHocController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;
        public KhoaHocController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc")]
        public IActionResult layDanhSachKhoaHoc()
        {
            var KhoaHocs = db.KhoaHocs.Where(t => true).ToList();
            var dsKhoaHoc = new List<object>();
            if (KhoaHocs != null)
            {
                foreach (var kh in KhoaHocs)
                {
                    if (kh.TrangThai == "Đang bán")
                    {
                        int? tong = 0;
                        int dem = 0;
                        double trungBinhSao = 0;
                        var danhGias = db.DanhGiaKhoaHocs.Where(t => t.MaKh == kh.MaKh).ToList();
                        var tenGv = db.KhoaHocs.Where(t => t.MaKh == kh.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault();
                        var tenDM = db.DanhMucs.Where(t => t.MaDm == kh.MaDm).FirstOrDefault();
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
                                maKh = kh.MaKh,
                                hinhAnh = kh.Hinh,
                                tenKh = kh.TenKh,
                                tongSao = trungBinhSao,
                                donGia = kh.Gia,
                                maDM = kh.MaDm,
                                tenDM = tenDM?.TenDm,
                                tenGv = tenGv,
                                tongDg = danhGias.Count,
                                //giaGiam = kh.GiaDaGiam,
                            };
                            dsKhoaHoc.Add(khoaHoc);
                            dem = 0;
                            tong = 0;
                        }
                        else
                        {
                            var khoaHoc = new
                            {
                                maKh = kh.MaKh,
                                hinhAnh = kh.Hinh,
                                tenKh = kh.TenKh,
                                tongSao = trungBinhSao,
                                donGia = kh.Gia,
                                maDM = kh.MaDm,
                                tenDM = tenDM?.TenDm,
                                tenGv = tenGv,
                                tongDg = danhGias.Count,
                                //giaGiam = kh.GiaDaGiam,
                            };
                            dsKhoaHoc.Add(khoaHoc);
                        }
                    }
                }
                return Ok(dsKhoaHoc);
            }
            return Ok(new { message = "Error" });
        }


        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-theo-ma-danh-muc")]
        public IActionResult layDanhSachKhoaHocTheoMaDanhMuc(string maDM)
        {
            var KhoaHocs = db.KhoaHocs.Where(t => t.MaDm == maDM).ToList();
            var dsKhoaHoc = new List<object>();
            if (KhoaHocs != null)
            {

                foreach (var kh in KhoaHocs)
                {
                    if (kh.TrangThai == "Đang bán")
                    {
                        var tenDM = db.DanhMucs.Where(t => t.MaDm == kh.MaDm).FirstOrDefault();
                        int? tong = 0;
                        int dem = 0;
                        double trungBinhSao = 0;
                        var danhGias = db.DanhGiaKhoaHocs.Where(t => t.MaKh == kh.MaKh).ToList();
                        var tenGv = db.KhoaHocs.Where(t => t.MaKh == kh.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault();
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
                                maKh = kh.MaKh,
                                hinhAnh = kh.Hinh,
                                tenKh = kh.TenKh,
                                tongSao = trungBinhSao,
                                donGia = kh.Gia,
                                tenGv = tenGv,
                                tenDM = tenDM.TenDm,
                                tongDg = danhGias.Count,
                                //giaGiam = kh.GiaDaGiam,
                            };
                            dsKhoaHoc.Add(khoaHoc);

                        }
                        else
                        {
                            var khoaHoc = new
                            {
                                maKh = kh.MaKh,
                                hinhAnh = kh.Hinh,
                                tenKh = kh.TenKh,
                                tongSao = trungBinhSao,
                                donGia = kh.Gia,
                                tenDM = tenDM.TenDm,
                                tenGv = tenGv,
                                tongDg = danhGias.Count,
                                //giaGiam = kh.GiaDaGiam,

                            };
                            dsKhoaHoc.Add(khoaHoc);
                        }
                    }


                }
                return Ok(dsKhoaHoc);
            }
            return Ok(new { message = "Error" });
        }



        [HttpGet]
        [Route("lay-danh-sach-khoa-hoc-da-mua")]
        public IActionResult layDanhSachKhoaHocDaMua(string maHv)
        {

            var khoaHocDaMua = db.KhoaHocDaMuas.Where(t => t.MaHv == maHv).ToList();
            var dsKh = new List<object>();
            if (khoaHocDaMua != null)
            {

                foreach (var item in khoaHocDaMua)
                {

                    var khoaHoc = db.KhoaHocs
                        .Where(t => t.MaKh == item.MaKh)
                        .Select(t => new
                        {
                            maKh = t.MaKh,
                            HinhAnh = t.Hinh,
                            TenKh = t.TenKh,
                            TenGv = t.MaGvNavigation.TenGv
                        })
                        .FirstOrDefault();

                    dsKh.Add(khoaHoc);

                }
                return Ok(dsKh);
            }
            return Ok(dsKh);
        }

        [HttpPut]
        [Route("cap-nhat-tien-trinh-hoc")]
        public IActionResult capNhatTienTrinhHoc(string maKhoaHoc, string maHV)
        {
            var khdm = db.KhoaHocDaMuas.Where(t => t.MaHv == maHV && t.MaKh == maKhoaHoc).FirstOrDefault();
            if (khdm != null)
            {
                khdm.TienTrinh = khdm.TienTrinh + 1;
                var check = db.SaveChanges();
                if (check > 0)
                {
                    return Ok(new { status = "Succes", message = "Cập nhật tiến trình thành công!" });
                }
                else
                {
                    return Ok(new { status = "Error", message = "Cập nhật tiến trình không thành công!" });
                }
            }
            return Ok(new { status = "Error", message = "Cập nhật tiến trình không thành công!" });
        }

        [HttpGet]
        [Route("lay-thong-tin-khoa-hoc-theo-ma-da-mua")]
        public IActionResult layThongTinKhoaHocTheoMaDaMua(string maKhoaHoc, string maHV)
        {
            int? tong = 0;
            int dem = 0;
            double trungBinhSao = 0;
            var danhGias = db.DanhGiaKhoaHocs.Where(t => t.MaKh == maKhoaHoc).ToList();
            if (danhGias.Count != 0)
            {
                foreach (var dg in danhGias)
                {
                    tong += dg.SoSao;
                    dem++;
                }
                trungBinhSao = (double)tong / dem;
                trungBinhSao = Math.Round(trungBinhSao, 2); // Làm tròn đến 2 chữ số thập phân
            }

            var slSvMua = db.KhoaHocDaMuas.Where(t => t.MaKh == maKhoaHoc).Count();

            var khdm = db.KhoaHocDaMuas.Where(t => t.MaHv == maHV && t.MaKh == maKhoaHoc).FirstOrDefault();

            var khoaHoc = db.KhoaHocs
                .Where(t => t.MaKh == maKhoaHoc)
                .Select(t => new
                {
                    maKh = t.MaKh,
                    maGV = t.MaGv,
                    tenGV = t.MaGvNavigation.TenGv,
                    hinhGV = t.MaGvNavigation.Avata,
                    maDM = t.MaDm,
                    tenDM = t.MaDmNavigation.TenDm,
                    donGia = t.Gia,
                    //giaDaGiam = t.GiaDaGiam,
                    moTa = t.GioiThieu,
                    kqdd = t.KetQuaDatDuoc,
                    hinh = t.Hinh,
                    tenKh = t.TenKh,
                    tongSao = trungBinhSao,
                    soLuongThamGia = slSvMua,
                    tongDanhGia = dem,
                    tienTrinh = khdm.TienTrinh,
                    dsChuong = t.ChuongKhoaHocs.Select(
                                    r => new
                                    {
                                        tenChuong = r.TenChuong,
                                        maChuong = r.MaCh,
                                        phan = r.Stt,
                                        noiDungChuongs = r.NoiDungs.Select(
                                            e => new
                                            {
                                                phan = e.Stt,
                                                tenNoiDung = e.TieuDe,
                                                maNoiDung = e.MaNd,
                                                maLoaiNoiDung = e.MaLoaiNd,
                                                moTa = e.MoTa,
                                                video = e.Videos,
                                                tracNghiem = e.TracNghiems.Select(f => new
                                                {
                                                    maTN = f.MaTrn,
                                                    cauHoi = f.TenCauHoi,
                                                    dapAnDung = f.DapAnDung,
                                                    dapAn = f.DapAns.Select(g => new
                                                    {
                                                        maDa = g.MaDa,
                                                        tenDa = g.TenDa,
                                                        stt = g.SttDn,
                                                        giaiThich = g.GiaiThich
                                                    }).OrderBy(g => g.stt).ToList()
                                                }).ToList()
                                            }).OrderBy(e => e.phan).ToList()
                                    }).OrderBy(r => r.phan).ToList()
                }).FirstOrDefault();
            return Ok(khoaHoc);
        }






        [HttpGet]
        [Route("lay-thong-tin-khoa-hoc-theo-ma")]
        public IActionResult layThongTinKhoaHocTheoMa(string maKhoaHoc)
        {
            int? tong = 0;
            int dem = 0;
            double trungBinhSao = 0;
            var danhGias = db.DanhGiaKhoaHocs.Where(t => t.MaKh == maKhoaHoc).ToList();
            if (danhGias.Count != 0)
            {
                foreach (var dg in danhGias)
                {
                    tong += dg.SoSao;
                    dem++;
                }
                trungBinhSao = (double)tong / dem;
                trungBinhSao = Math.Round(trungBinhSao, 2); // Làm tròn đến 2 chữ số thập phân
            }

            var slSvMua = db.KhoaHocDaMuas.Where(t => t.MaKh == maKhoaHoc).Count();



            var khoaHoc = db.KhoaHocs
                .Where(t => t.MaKh == maKhoaHoc)
                .Select(t => new
                {
                    maKh = t.MaKh,
                    maGV = t.MaGv,
                    tenGV = t.MaGvNavigation.TenGv,
                    hinhGV = t.MaGvNavigation.Avata,
                    maDM = t.MaDm,
                    tenDM = t.MaDmNavigation.TenDm,
                    donGia = t.Gia,
                    //giaDaGiam = t.GiaDaGiam,
                    moTa = t.GioiThieu,
                    kqdd = t.KetQuaDatDuoc,
                    hinh = t.Hinh,
                    tenKh = t.TenKh,
                    tongSao = trungBinhSao,
                    soLuongThamGia = slSvMua,
                    tongDanhGia = dem,
                    dsdg = t.DanhGiaKhoaHocs.Select(a => new
                    {
                        maDG = a.MaDanhGia,
                        tenHV= a.MaHvNavigation.HoTen,
                        avt = a.MaHvNavigation.Avata,
                        soSao = a.SoSao,
                        noiDung = a.NoiDung,
                        ngayDG = a.NgayDg
                    }).ToList(),
                    dsChuong = t.ChuongKhoaHocs.Select(
                                    r => new
                                    {
                                        tenChuong = r.TenChuong,
                                        maChuong = r.MaCh,
                                        phan = r.Stt,
                                        noiDungChuongs = r.NoiDungs.Select(
                                            e => new
                                            {
                                                phan = e.Stt,
                                                tenNoiDung = e.TieuDe,
                                                maNoiDung = e.MaNd,
                                                maLoaiNoiDung = e.MaLoaiNd,
                                                moTa = e.MoTa,
                                                video = e.Videos
                                            }).OrderBy(e => e.phan).ToList()
                                    }).OrderBy(r => r.phan).ToList()
                }).FirstOrDefault();
            return Ok(khoaHoc);
        }



        [HttpGet]
        [Route("tim-kiem-khoa-hoc")]
        public IActionResult timKhoaHoc(string tuKhoa)
        {
            TimKiem tk = new TimKiem();
            var KhoaHocs = db.KhoaHocs.Where(t => true).ToList();
            List<KhoaHoc> dsKhoaHoc = tk.timKiem(KhoaHocs, tuKhoa);
            return Ok(dsKhoaHoc);
        }

        [HttpGet]
        [Route("tim-kiem-khoa-hoc-moi-cua-an")]
        public IActionResult timKhoaHocMoiCuaAn(string tuKhoa)
        {
            TimKiem tk = new TimKiem();
            var khoaHocs = db.KhoaHocs.Where(t => true).ToList();
            HashSet<object> dsKhoaHocHashSet = tk.timKiemMoiCuaAn(khoaHocs, tuKhoa);

            // Chuyển HashSet thành List trước khi trả về
            List<object> dsKhoaHoc = dsKhoaHocHashSet.ToList();

            return Ok(dsKhoaHoc);
        }

        [HttpPut]
        [Route("duyet-khoa-hoc")]
        public IActionResult duyetKhoaHoc(string maKh, string trangThaiDuyet)
        {
            var kh = db.KhoaHocs.Where(t => t.MaKh == maKh).FirstOrDefault();
            kh.TrangThai = trangThaiDuyet;
            db.SaveChanges();
            return Ok(new { status = "Succes" });
        }
    }
}


