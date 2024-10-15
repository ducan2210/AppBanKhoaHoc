using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class NoiDung
    {
        public NoiDung()
        {
            TracNghiems = new HashSet<TracNghiem>();
            Videos = new HashSet<Video>();
        }

        public string MaNd { get; set; }
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public int Stt { get; set; }
        public string MaCh { get; set; }
        public string MaLoaiNd { get; set; }

        public virtual ChuongKhoaHoc MaChNavigation { get; set; }
        public virtual LoaiNoiDung MaLoaiNdNavigation { get; set; }
        public virtual ICollection<TracNghiem> TracNghiems { get; set; }
        public virtual ICollection<Video> Videos { get; set; }
    }
}
