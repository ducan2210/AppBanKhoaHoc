using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class ChiTietGioHang
    {
        public string MaKh { get; set; }
        public string MaGh { get; set; }
        public float? DonGia { get; set; }

        public virtual GioHang MaGhNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
