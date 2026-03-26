using api.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:8080");

builder.Services.AddSingleton<TimescaleRepository>();

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.MapGet("/", () => Results.Ok(new { message = "ASP.NET Core API is running" }));

app.MapGet("/api/timescale/example", async (TimescaleRepository repo) =>
{
    // Example: Query using time_bucket for TimescaleDB
    var result = await repo.QueryAsync<dynamic>(
        @"SELECT time_bucket('1 hour', now()) AS bucket,
                 count(*) AS count
          FROM generate_series(now() - interval '24 hours', now(), interval '1 hour') AS t");
    return Results.Ok(result);
});

app.Run();
