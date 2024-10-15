using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class VaiTro
    {
        public VaiTro()
        {
            NguoiDungs = new HashSet<NguoiDung>();
        }

        public string MaVt { get; set; }
        public string TenVt { get; set; }

        public virtual ICollection<NguoiDung> NguoiDungs { get; set; }
    }
}
