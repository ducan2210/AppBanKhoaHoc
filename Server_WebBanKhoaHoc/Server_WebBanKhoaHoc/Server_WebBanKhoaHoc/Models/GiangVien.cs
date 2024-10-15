using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class GiangVien
    {
        public GiangVien()
        {
            GiamGia = new HashSet<GiamGium>();
            KhoaHocs = new HashSet<KhoaHoc>();
        }

        public string MaGv { get; set; }
        public string TenGv { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string Phai { get; set; }
        public string Sdt { get; set; }
        public string Email { get; set; }
        public string MaNg { get; set; }
        public string Avata { get; set; }
        public string LinhVuc { get; set; }
        public string MatSauCccd { get; set; }
        public string MatTruocCccd { get; set; }

        public virtual NguoiDung MaNgNavigation { get; set; }
        public virtual ICollection<GiamGium> GiamGia { get; set; }
        public virtual ICollection<KhoaHoc> KhoaHocs { get; set; }
    }
}
