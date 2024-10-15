using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanKhoaHoc.ClassSupport
{
    public class TimKiem
    {

        public readonly DB_QLKHOAHOCContext db = new DB_QLKHOAHOCContext();
        public TimKiem()
        {

        }
        public List<KhoaHoc> timKiem(List<KhoaHoc> kh, string tuKhoa)
        {

            List<KhoaHoc> ketQua = new List<KhoaHoc>();

            foreach (var khoaHoc in kh)
            {
                var giangVien = db.GiangViens.Where(t => t.MaGv == khoaHoc.MaGv).FirstOrDefault();
                var danhMuc = db.DanhMucs.Where(t => t.MaDm == khoaHoc.MaDm).FirstOrDefault();
                if (giangVien != null && giangVien.TenGv.ToLower().Contains(tuKhoa.ToLower()) && !ketQua.Contains(khoaHoc))
                {
                    ketQua.Add(khoaHoc);
                }
                if (khoaHoc.TenKh.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.GioiThieu.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.KetQuaDatDuoc.ToLower().Contains(tuKhoa.ToLower())
                    && !ketQua.Contains(khoaHoc))
                {
                    ketQua.Add(khoaHoc);
                }
                if (danhMuc != null && danhMuc.TenDm.ToLower().Contains(tuKhoa.ToLower()) && !ketQua.Contains(khoaHoc))
                {
                    ketQua.Add(khoaHoc);
                }
            }
            return ketQua;
        }
        public HashSet<object> timKiemMoiCuaAn(List<KhoaHoc> kh, string tuKhoa)
        {
            HashSet<object> ketQua = new HashSet<object>();

            foreach (var khoaHoc in kh)
            {
                // Kiểm tra trùng lặp trong ketQua để không thêm các khoá học trùng lặp
                bool daTonTai = ketQua.Any(k => ((dynamic)k).maKh == khoaHoc.MaKh);
                if (daTonTai) continue;

                var giangVien = db.GiangViens.FirstOrDefault(t => t.MaGv == khoaHoc.MaGv);
                var danhMuc = db.DanhMucs.FirstOrDefault(t => t.MaDm == khoaHoc.MaDm);
                int? tong = 0;
                int dem = 0;
                double trungBinhSao = 0;
                var danhGias = db.DanhGiaKhoaHocs.Where(t => t.MaKh == khoaHoc.MaKh).ToList();
                var tenGV = db.KhoaHocs.Where(t => t.MaKh == khoaHoc.MaKh).Select(t => t.MaGvNavigation.TenGv).FirstOrDefault();
                foreach (var dg in danhGias)
                {
                    tong += dg.SoSao;
                    dem++;
                }
                if (dem > 0) // Kiểm tra tránh lỗi chia cho 0
                {
                    trungBinhSao = (double)tong / dem;
                }

                var khnew = new
                {
                    maKh = khoaHoc.MaKh,
                    tenKh = khoaHoc.TenKh,
                    tenGv = tenGV, 
                    hinhAnh = khoaHoc.Hinh,
                    donGia = khoaHoc.Gia,
                    tongDg = dem,
                    soSao = trungBinhSao,
                };

                // Thêm khnew vào ketQua nếu thỏa mãn ít nhất một điều kiện tìm kiếm
                if (giangVien != null && giangVien.TenGv.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.TenKh.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.GioiThieu.ToLower().Contains(tuKhoa.ToLower()) ||
                    khoaHoc.KetQuaDatDuoc.ToLower().Contains(tuKhoa.ToLower()) ||
                    (danhMuc != null && danhMuc.TenDm.ToLower().Contains(tuKhoa.ToLower())))
                {
                    ketQua.Add(khnew);
                }
            }

            return ketQua;
        }
    }
}
