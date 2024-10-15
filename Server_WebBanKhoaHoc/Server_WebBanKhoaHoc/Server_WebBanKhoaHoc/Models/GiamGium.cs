using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class GiamGium
    {
        public GiamGium()
        {
            ChiTietGiamGia = new HashSet<ChiTietGiamGium>();
        }

        public string MaGg { get; set; }
        public float? PhanTramGiam { get; set; }
        public string MaGv { get; set; }
        public string GhiChu { get; set; }
        public DateTime NgayTao { get; set; }

        public virtual GiangVien MaGvNavigation { get; set; }
        public virtual ICollection<ChiTietGiamGium> ChiTietGiamGia { get; set; }
    }
}
