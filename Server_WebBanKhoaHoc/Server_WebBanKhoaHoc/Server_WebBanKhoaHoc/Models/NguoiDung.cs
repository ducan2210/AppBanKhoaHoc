using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class NguoiDung
    {
        public NguoiDung()
        {
            GiangViens = new HashSet<GiangVien>();
            HocViens = new HashSet<HocVien>();
        }

        public string MaNg { get; set; }
        public string TenDn { get; set; }
        public string MatKhau { get; set; }
        public string MaVt { get; set; }
        public string TrangThai { get; set; }

        public virtual VaiTro MaVtNavigation { get; set; }
        public virtual ICollection<GiangVien> GiangViens { get; set; }
        public virtual ICollection<HocVien> HocViens { get; set; }
    }
}
