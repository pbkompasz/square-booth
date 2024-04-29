using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// builder.Services.AddDbContext<TodoContext>(options =>
//   options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// using (var serviceScope = builder.Services.BuildServiceProvider().CreateScope())
// {
//   var dbContext = serviceScope.ServiceProvider.GetRequiredService<TodoContext>();
//   dbContext.Database.Migrate();
// }
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.MapGet("/", () => "Hello World!");

// app.MapPost("/search", (string prompt) => $"Hello World! {prompt ?? "no-prompt"}");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
