using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class GioHang
    {
        public GioHang()
        {
            ChiTietGioHangs = new HashSet<ChiTietGioHang>();
        }

        public string MaGh { get; set; }
        public string MaHv { get; set; }
        public float? TongTien { get; set; }

        public virtual HocVien MaHvNavigation { get; set; }
        public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; }
    }
}
