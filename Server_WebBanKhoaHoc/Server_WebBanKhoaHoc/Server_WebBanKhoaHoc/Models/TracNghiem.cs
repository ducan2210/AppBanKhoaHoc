using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class TracNghiem
    {
        public TracNghiem()
        {
            DapAns = new HashSet<DapAn>();
        }

        public string MaTrn { get; set; }
        public string TenCauHoi { get; set; }
        public string MaNd { get; set; }
        public int? DapAnDung { get; set; }

        public virtual NoiDung MaNdNavigation { get; set; }
        public virtual ICollection<DapAn> DapAns { get; set; }
    }
}
