using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class HoaDon
    {
        public HoaDon()
        {
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
        }

        public string MaHd { get; set; }
        public string MaHv { get; set; }
        public float? TongTien { get; set; }
        public DateTime NgayThanhToan { get; set; }

        public virtual HocVien MaHvNavigation { get; set; }
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
    }
}
