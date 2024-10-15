using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class HocVien
    {
        public HocVien()
        {
            DanhGiaKhoaHocs = new HashSet<DanhGiaKhoaHoc>();
            GioHangs = new HashSet<GioHang>();
            HoaDons = new HashSet<HoaDon>();
            KhoaHocDaMuas = new HashSet<KhoaHocDaMua>();
        }

        public string MaHv { get; set; }
        public string HoTen { get; set; }
        public DateTime NgaySinh { get; set; }
        public string Avata { get; set; }
        public string Email { get; set; }
        public string Sdt { get; set; }
        public string MaNg { get; set; }

        public virtual NguoiDung MaNgNavigation { get; set; }
        public virtual ICollection<DanhGiaKhoaHoc> DanhGiaKhoaHocs { get; set; }
        public virtual ICollection<GioHang> GioHangs { get; set; }
        public virtual ICollection<HoaDon> HoaDons { get; set; }
        public virtual ICollection<KhoaHocDaMua> KhoaHocDaMuas { get; set; }
    }
}
