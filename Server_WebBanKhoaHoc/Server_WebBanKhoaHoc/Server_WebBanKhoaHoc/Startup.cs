using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
using Microsoft.EntityFrameworkCore;

namespace Server_WebBanKhoaHoc
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Server_WebBanKhoaHoc", Version = "v1" });
            });

            // tao  ket noi data base, 
            services.AddDbContext<DB_QLKHOAHOCContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));

            // dang  ky cors
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowReactApp",
            //        builder => builder.WithOrigins("http://localhost:3000") // Thay thế bằng tên miền của ứng dụng React
            //        .AllowAnyHeader()
            //        .AllowAnyMethod()
            //        .AllowCredentials());
            //});
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowAll",
            //        builder =>
            //        {
            //            builder.AllowAnyOrigin()
            //                   .AllowAnyMethod()
            //                   .AllowAnyHeader();
            //        });
            //});

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Server_WebBanKhoaHoc v1"));
            }

            //app.UseCors("AllowAll");

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
