using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class Video
    {
        public string MaVideo { get; set; }
        public string VideoUlr { get; set; }
        public string MaNd { get; set; }
        public DateTime Ngay { get; set; }
        public string TenFile { get; set; }
        public string ThoiLuongVideo { get; set; }

        public virtual NoiDung MaNdNavigation { get; set; }
    }
}
