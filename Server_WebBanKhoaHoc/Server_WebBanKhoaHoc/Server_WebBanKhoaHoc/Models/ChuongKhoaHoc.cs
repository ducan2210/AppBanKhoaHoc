using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class ChuongKhoaHoc
    {
        public ChuongKhoaHoc()
        {
            NoiDungs = new HashSet<NoiDung>();
        }

        public string MaCh { get; set; }
        public string MaKh { get; set; }
        public string TenChuong { get; set; }
        public int Stt { get; set; }

        public virtual KhoaHoc MaKhNavigation { get; set; }
        public virtual ICollection<NoiDung> NoiDungs { get; set; }
    }
}
