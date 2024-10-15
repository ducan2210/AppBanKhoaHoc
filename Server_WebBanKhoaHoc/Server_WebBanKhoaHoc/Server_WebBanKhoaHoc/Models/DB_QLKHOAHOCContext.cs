using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class DB_QLKHOAHOCContext : DbContext
    {
        public DB_QLKHOAHOCContext()
        {
        }

        public DB_QLKHOAHOCContext(DbContextOptions<DB_QLKHOAHOCContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChiTietGiamGium> ChiTietGiamGia { get; set; }
        public virtual DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; }
        public virtual DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        public virtual DbSet<ChuongKhoaHoc> ChuongKhoaHocs { get; set; }
        public virtual DbSet<DanhGiaKhoaHoc> DanhGiaKhoaHocs { get; set; }
        public virtual DbSet<DanhMuc> DanhMucs { get; set; }
        public virtual DbSet<DapAn> DapAns { get; set; }
        public virtual DbSet<GiamGium> GiamGia { get; set; }
        public virtual DbSet<GiangVien> GiangViens { get; set; }
        public virtual DbSet<GioHang> GioHangs { get; set; }
        public virtual DbSet<HoaDon> HoaDons { get; set; }
        public virtual DbSet<HocVien> HocViens { get; set; }
        public virtual DbSet<KhoaHoc> KhoaHocs { get; set; }
        public virtual DbSet<KhoaHocDaMua> KhoaHocDaMuas { get; set; }
        public virtual DbSet<LoaiNoiDung> LoaiNoiDungs { get; set; }
        public virtual DbSet<NguoiDung> NguoiDungs { get; set; }
        public virtual DbSet<NoiDung> NoiDungs { get; set; }
        public virtual DbSet<TracNghiem> TracNghiems { get; set; }
        public virtual DbSet<VaiTro> VaiTros { get; set; }
        public virtual DbSet<Video> Videos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=db_e-learning;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ChiTietGiamGium>(entity =>
            {
                entity.HasKey(e => new { e.MaKh, e.MaGg });

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh");

                entity.Property(e => e.MaGg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGg");

                entity.Property(e => e.NgayBatDau)
                    .HasColumnType("date")
                    .HasColumnName("ngayBatDau");

                entity.Property(e => e.NgayKetThuc)
                    .HasColumnType("date")
                    .HasColumnName("ngayKetThuc");

                entity.HasOne(d => d.MaGgNavigation)
                    .WithMany(p => p.ChiTietGiamGia)
                    .HasForeignKey(d => d.MaGg)
                    .HasConstraintName("FK_chiTietGiamGia_GiamGia");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.ChiTietGiamGia)
                    .HasForeignKey(d => d.MaKh);
            });

            modelBuilder.Entity<ChiTietGioHang>(entity =>
            {
                entity.HasKey(e => new { e.MaGh, e.MaKh });

                entity.ToTable("ChiTietGioHang");

                entity.Property(e => e.MaGh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGh")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh");

                entity.Property(e => e.DonGia).HasColumnName("donGia");

                entity.HasOne(d => d.MaGhNavigation)
                    .WithMany(p => p.ChiTietGioHangs)
                    .HasForeignKey(d => d.MaGh)
                    .HasConstraintName("FK_chiTietGioHang_gioHang");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.ChiTietGioHangs)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK_chiTietGioHang_khoaHoc");
            });

            modelBuilder.Entity<ChiTietHoaDon>(entity =>
            {
                entity.HasKey(e => new { e.MaHd, e.MaKh });

                entity.ToTable("ChiTietHoaDon");

                entity.Property(e => e.MaHd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHd")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh");

                entity.Property(e => e.DonGia).HasColumnName("donGia");

                entity.HasOne(d => d.MaHdNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaHd)
                    .HasConstraintName("FK_ChiTietHoaDons_HoaDon");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK_ChiTietHoaDons_KhoaHoc");
            });

            modelBuilder.Entity<ChuongKhoaHoc>(entity =>
            {
                entity.HasKey(e => e.MaCh);

                entity.ToTable("ChuongKhoaHoc");

                entity.Property(e => e.MaCh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maCh");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh");

                entity.Property(e => e.Stt).HasColumnName("stt");

                entity.Property(e => e.TenChuong)
                    .HasMaxLength(255)
                    .HasColumnName("tenChuong");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.ChuongKhoaHocs)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK_ChuongKhoaHoc_khoaHoc");
            });

            modelBuilder.Entity<DanhGiaKhoaHoc>(entity =>
            {
                entity.HasKey(e => e.MaDanhGia);

                entity.ToTable("DanhGiaKhoaHoc");

                entity.Property(e => e.MaDanhGia).HasColumnName("maDanhGia");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHv");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh");

                entity.Property(e => e.NgayDg)
                    .HasColumnType("date")
                    .HasColumnName("ngayDg");

                entity.Property(e => e.NoiDung).HasColumnName("noiDung");

                entity.Property(e => e.SoSao).HasColumnName("soSao");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.DanhGiaKhoaHocs)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK_DanhGiaKhoaHoc_HocVien");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.DanhGiaKhoaHocs)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK_DanhGiaKhoaHoc_KhoaHoa");
            });

            modelBuilder.Entity<DanhMuc>(entity =>
            {
                entity.HasKey(e => e.MaDm);

                entity.ToTable("DanhMuc");

                entity.Property(e => e.MaDm)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maDm");

                entity.Property(e => e.TenDm)
                    .HasMaxLength(255)
                    .HasColumnName("tenDm");
            });

            modelBuilder.Entity<DapAn>(entity =>
            {
                entity.HasKey(e => e.MaDa);

                entity.ToTable("DapAn");

                entity.Property(e => e.MaDa)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maDa");

                entity.Property(e => e.GiaiThich).HasColumnName("giaiThich");

                entity.Property(e => e.MaTrn)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maTrn");

                entity.Property(e => e.SttDn).HasColumnName("sttDn");

                entity.Property(e => e.TenDa).HasColumnName("tenDa");

                entity.HasOne(d => d.MaTrnNavigation)
                    .WithMany(p => p.DapAns)
                    .HasForeignKey(d => d.MaTrn)
                    .HasConstraintName("FK_DapAn_TracNghiem");
            });

            modelBuilder.Entity<GiamGium>(entity =>
            {
                entity.HasKey(e => e.MaGg);

                entity.Property(e => e.MaGg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGg");

                entity.Property(e => e.GhiChu).HasColumnName("ghiChu");

                entity.Property(e => e.MaGv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGv");

                entity.Property(e => e.NgayTao)
                    .HasColumnType("datetime")
                    .HasColumnName("ngayTao");

                entity.Property(e => e.PhanTramGiam).HasColumnName("phanTramGiam");

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany(p => p.GiamGia)
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK_GiamGia_GiangVien");
            });

            modelBuilder.Entity<GiangVien>(entity =>
            {
                entity.HasKey(e => e.MaGv);

                entity.ToTable("GiangVien");

                entity.Property(e => e.MaGv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGv");

                entity.Property(e => e.Avata)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("avata");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.LinhVuc)
                    .HasMaxLength(255)
                    .HasColumnName("linhVuc");

                entity.Property(e => e.MaNg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maNg");

                entity.Property(e => e.MatSauCccd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("matSauCccd");

                entity.Property(e => e.MatTruocCccd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("matTruocCccd");

                entity.Property(e => e.NgaySinh)
                    .HasColumnType("date")
                    .HasColumnName("ngaySinh");

                entity.Property(e => e.Phai)
                    .HasMaxLength(10)
                    .HasColumnName("phai");

                entity.Property(e => e.Sdt)
                    .HasMaxLength(11)
                    .HasColumnName("sdt");

                entity.Property(e => e.TenGv)
                    .HasMaxLength(255)
                    .HasColumnName("tenGv");

                entity.HasOne(d => d.MaNgNavigation)
                    .WithMany(p => p.GiangViens)
                    .HasForeignKey(d => d.MaNg)
                    .HasConstraintName("FK_giangVien_nguoiDung");
            });

            modelBuilder.Entity<GioHang>(entity =>
            {
                entity.HasKey(e => e.MaGh);

                entity.ToTable("GioHang");

                entity.Property(e => e.MaGh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGh");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHv");

                entity.Property(e => e.TongTien).HasColumnName("tongTien");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.GioHangs)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK_gioHang_hocVien");
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.HasKey(e => e.MaHd);

                entity.ToTable("HoaDon");

                entity.Property(e => e.MaHd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHd");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHv");

                entity.Property(e => e.NgayThanhToan)
                    .HasColumnType("date")
                    .HasColumnName("ngayThanhToan");

                entity.Property(e => e.TongTien).HasColumnName("tongTien");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.HoaDons)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK_HoaDon_HocVien");
            });

            modelBuilder.Entity<HocVien>(entity =>
            {
                entity.HasKey(e => e.MaHv);

                entity.ToTable("HocVien");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHv");

                entity.Property(e => e.Avata)
                    .IsUnicode(false)
                    .HasColumnName("avata");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.HoTen)
                    .HasMaxLength(255)
                    .HasColumnName("hoTen");

                entity.Property(e => e.MaNg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maNg");

                entity.Property(e => e.NgaySinh)
                    .HasColumnType("date")
                    .HasColumnName("ngaySinh");

                entity.Property(e => e.Sdt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("sdt");

                entity.HasOne(d => d.MaNgNavigation)
                    .WithMany(p => p.HocViens)
                    .HasForeignKey(d => d.MaNg)
                    .HasConstraintName("FK_hocvien_nguoiDung");
            });

            modelBuilder.Entity<KhoaHoc>(entity =>
            {
                entity.HasKey(e => e.MaKh);

                entity.ToTable("KhoaHoc");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh");

                entity.Property(e => e.Gia).HasColumnName("gia");

                entity.Property(e => e.GiaGiam).HasColumnName("giaGiam");

                entity.Property(e => e.GioiThieu).HasColumnName("gioiThieu");

                entity.Property(e => e.Hinh)
                    .HasMaxLength(255)
                    .HasColumnName("hinh");

                entity.Property(e => e.KetQuaDatDuoc).HasColumnName("ketQuaDatDuoc");

                entity.Property(e => e.MaDm)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maDm");

                entity.Property(e => e.MaGv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maGv");

                entity.Property(e => e.TenKh)
                    .HasMaxLength(255)
                    .HasColumnName("tenKh");

                entity.Property(e => e.TrangThai)
                    .HasMaxLength(255)
                    .HasColumnName("trangThai");

                entity.HasOne(d => d.MaDmNavigation)
                    .WithMany(p => p.KhoaHocs)
                    .HasForeignKey(d => d.MaDm)
                    .HasConstraintName("FK_khoaHoc_danhmuc");

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany(p => p.KhoaHocs)
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK_khoaHoc_giangVien");
            });

            modelBuilder.Entity<KhoaHocDaMua>(entity =>
            {
                entity.HasKey(e => new { e.MaKh, e.MaHv });

                entity.ToTable("KhoaHocDaMua");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maKh")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maHv");

                entity.Property(e => e.TienTrinh).HasColumnName("tienTrinh");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.KhoaHocDaMuas)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK_KhoaHocDaMuas_KhoaHoc");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.KhoaHocDaMuas)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK_KhoaHocDaMuas_HoaDon");
            });

            modelBuilder.Entity<LoaiNoiDung>(entity =>
            {
                entity.HasKey(e => e.MaLoaiNd);

                entity.ToTable("LoaiNoiDung");

                entity.Property(e => e.MaLoaiNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maLoaiNd");

                entity.Property(e => e.TenLoai)
                    .HasMaxLength(255)
                    .HasColumnName("tenLoai");
            });

            modelBuilder.Entity<NguoiDung>(entity =>
            {
                entity.HasKey(e => e.MaNg);

                entity.ToTable("NguoiDung");

                entity.Property(e => e.MaNg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maNg");

                entity.Property(e => e.MaVt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maVt");

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(255)
                    .HasColumnName("matKhau");

                entity.Property(e => e.TenDn)
                    .HasMaxLength(255)
                    .HasColumnName("tenDn");

                entity.Property(e => e.TrangThai)
                    .HasMaxLength(255)
                    .HasColumnName("trangThai");

                entity.HasOne(d => d.MaVtNavigation)
                    .WithMany(p => p.NguoiDungs)
                    .HasForeignKey(d => d.MaVt)
                    .HasConstraintName("FK_nguoiDung_vaiTro");
            });

            modelBuilder.Entity<NoiDung>(entity =>
            {
                entity.HasKey(e => e.MaNd);

                entity.ToTable("NoiDung");

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maNd");

                entity.Property(e => e.MaCh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maCh");

                entity.Property(e => e.MaLoaiNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maLoaiNd");

                entity.Property(e => e.MoTa).HasColumnName("moTa");

                entity.Property(e => e.Stt).HasColumnName("stt");

                entity.Property(e => e.TieuDe)
                    .HasMaxLength(255)
                    .HasColumnName("tieuDe");

                entity.HasOne(d => d.MaChNavigation)
                    .WithMany(p => p.NoiDungs)
                    .HasForeignKey(d => d.MaCh)
                    .HasConstraintName("FK_BaiGiang_ChuongKhoaHoc");

                entity.HasOne(d => d.MaLoaiNdNavigation)
                    .WithMany(p => p.NoiDungs)
                    .HasForeignKey(d => d.MaLoaiNd)
                    .HasConstraintName("FK_BaiGiang_LoaiNoiDung");
            });

            modelBuilder.Entity<TracNghiem>(entity =>
            {
                entity.HasKey(e => e.MaTrn);

                entity.ToTable("TracNghiem");

                entity.Property(e => e.MaTrn)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maTrn");

                entity.Property(e => e.DapAnDung).HasColumnName("dapAnDung");

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maNd");

                entity.Property(e => e.TenCauHoi).HasColumnName("tenCauHoi");

                entity.HasOne(d => d.MaNdNavigation)
                    .WithMany(p => p.TracNghiems)
                    .HasForeignKey(d => d.MaNd)
                    .HasConstraintName("FK_TracNghiem_NoiDung");
            });

            modelBuilder.Entity<VaiTro>(entity =>
            {
                entity.HasKey(e => e.MaVt);

                entity.ToTable("VaiTro");

                entity.Property(e => e.MaVt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maVt");

                entity.Property(e => e.TenVt)
                    .HasMaxLength(50)
                    .HasColumnName("tenVt");
            });

            modelBuilder.Entity<Video>(entity =>
            {
                entity.HasKey(e => e.MaVideo);

                entity.ToTable("Video");

                entity.Property(e => e.MaVideo)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maVideo");

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("maNd");

                entity.Property(e => e.Ngay)
                    .HasColumnType("date")
                    .HasColumnName("ngay");

                entity.Property(e => e.TenFile)
                    .HasMaxLength(255)
                    .HasColumnName("tenFile");

                entity.Property(e => e.ThoiLuongVideo)
                    .HasMaxLength(255)
                    .HasColumnName("thoiLuongVideo");

                entity.Property(e => e.VideoUlr)
                    .IsUnicode(false)
                    .HasColumnName("videoUlr");

                entity.HasOne(d => d.MaNdNavigation)
                    .WithMany(p => p.Videos)
                    .HasForeignKey(d => d.MaNd)
                    .HasConstraintName("FK_Video_NoiDung");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
