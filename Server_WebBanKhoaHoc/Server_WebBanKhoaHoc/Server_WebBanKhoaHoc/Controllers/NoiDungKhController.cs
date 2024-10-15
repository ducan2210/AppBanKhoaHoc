using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
using Server_WebBanKhoaHoc.ClassSupport;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoiDungKhController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;

        public NoiDungKhController(DB_QLKHOAHOCContext db)
        {
            this.db = db;   
        }

        [HttpGet]
        [Route("lay-danh-sach-noi-dung-chuong")]
        public IActionResult LayDanhSachNoiDungChuong(string maCh)
        {
            var dsNoiDungChuong = db.NoiDungs.Where(t => t.MaCh == maCh).ToList();
            if (dsNoiDungChuong == null)
            {
                return Ok(new { message = "Error" });
            }
            return Ok(dsNoiDungChuong);
        }

        [HttpPost]
        [Route("tao-noi-dung-chuong")]
        public IActionResult TaoNoiDungChuong(string MaCH, NoiDung nd)
        {
            int stt = 1;
            var ndChuong = db.NoiDungs.Where(t => t.MaCh == MaCH).ToList();

            
            if (ndChuong.Count > 0)
            {
                var phanTuCoSttLonNhat = ndChuong.OrderByDescending(t => t.Stt).FirstOrDefault();
                stt = phanTuCoSttLonNhat.Stt + 1;
            }
            NoiDung newNd = new NoiDung();
            newNd.MaNd = TaoMaTuDong.GenerateRandomCode("NDC");
            newNd.MaCh = MaCH;
            newNd.TieuDe = nd.TieuDe;
            newNd.Stt = stt;
            db.NoiDungs.Add(newNd);
            int check = db.SaveChanges();
            if (check > 0)
            {
                return Ok(new { status = "Succes", message = "Thêm nội dung thành công" });
            }
            return Ok(new { status = "Error", message = "Thêm nội dung thất bại" });
        }


        //[HttpPut]
        //[Route("them-video-noi-dung")]
        //public IActionResult ThemVideoNoiDung(string maNd, string video)
        //{
        //    var noiDungChuong = db.NoiDungs.Where(t => t.MaNd == maNd).FirstOrDefault();

        //    if (noiDungChuong != null)
        //    {

        //        noiDungChuong.Video = video;
        //        db.SaveChanges();
        //        return Ok(new { status = "Success" });
        //    }
        //    return Ok(new { status = "Error" });
        //}


    }
}
