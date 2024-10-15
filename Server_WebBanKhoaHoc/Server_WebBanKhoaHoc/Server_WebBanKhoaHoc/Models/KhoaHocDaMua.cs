using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class KhoaHocDaMua
    {
        public string MaHv { get; set; }
        public string MaKh { get; set; }
        public int? TienTrinh { get; set; }

        public virtual HocVien MaHvNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
