using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server_WebBanKhoaHoc.ClassSupport
{
    public class FormatDate
    {

        public static string FmDateTime(DateTime? date)
        {
            return date.HasValue ? date.Value.ToString("dd-MM-yyyy HH:mm:ss") : string.Empty;
        }
        public static string FmDate(DateTime? date)
        {
            return date.HasValue ? date.Value.ToString("dd-MM-yyyy") : string.Empty;
        }
    }
}
