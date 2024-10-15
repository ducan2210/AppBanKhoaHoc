using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class ChiTietGiamGium
    {
        public string MaGg { get; set; }
        public string MaKh { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }

        public virtual GiamGium MaGgNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
