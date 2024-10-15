using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class ChiTietHoaDon
    {
        public string MaKh { get; set; }
        public string MaHd { get; set; }
        public float? DonGia { get; set; }

        public virtual HoaDon MaHdNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
