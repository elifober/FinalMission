using System.Security.Authentication.ExtendedProtection;
using Microsoft.EntityFrameworkCore;
using FinalMission.API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBooks",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
        }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactAppBooks");

app.UseAuthorization();

app.MapControllers();

app.Run();
