using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class DapAn
    {
        public string MaDa { get; set; }
        public string TenDa { get; set; }
        public int? SttDn { get; set; }
        public string MaTrn { get; set; }
        public string GiaiThich { get; set; }

        public virtual TracNghiem MaTrnNavigation { get; set; }
    }
}
