using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class LoaiNoiDung
    {
        public LoaiNoiDung()
        {
            NoiDungs = new HashSet<NoiDung>();
        }

        public string MaLoaiNd { get; set; }
        public string TenLoai { get; set; }

        public virtual ICollection<NoiDung> NoiDungs { get; set; }
    }
}
