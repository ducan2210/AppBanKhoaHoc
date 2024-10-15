using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server_WebBanKhoaHoc.ModelsVnPay
{
    public class OrderInfo
    {
        public long OrderId { get; set; }
        public long Amount { get; set; }
        public string OrderDesc { get; set; }

        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }

        public long PaymentTranId { get; set; }
        public string BankCode { get; set; }
        public string PayStatus { get; set; }

    }
}
