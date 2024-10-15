using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class KhoaHoc
    {
        public KhoaHoc()
        {
            ChiTietGiamGia = new HashSet<ChiTietGiamGium>();
            ChiTietGioHangs = new HashSet<ChiTietGioHang>();
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
            ChuongKhoaHocs = new HashSet<ChuongKhoaHoc>();
            DanhGiaKhoaHocs = new HashSet<DanhGiaKhoaHoc>();
            KhoaHocDaMuas = new HashSet<KhoaHocDaMua>();
        }

        public string MaKh { get; set; }
        public string TenKh { get; set; }
        public float? Gia { get; set; }
        public string Hinh { get; set; }
        public string GioiThieu { get; set; }
        public string TrangThai { get; set; }
        public string KetQuaDatDuoc { get; set; }
        public string MaGv { get; set; }
        public string MaDm { get; set; }
        public float? GiaGiam { get; set; }

        public virtual DanhMuc MaDmNavigation { get; set; }
        public virtual GiangVien MaGvNavigation { get; set; }
        public virtual ICollection<ChiTietGiamGium> ChiTietGiamGia { get; set; }
        public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; }
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        public virtual ICollection<ChuongKhoaHoc> ChuongKhoaHocs { get; set; }
        public virtual ICollection<DanhGiaKhoaHoc> DanhGiaKhoaHocs { get; set; }
        public virtual ICollection<KhoaHocDaMua> KhoaHocDaMuas { get; set; }
    }
}
