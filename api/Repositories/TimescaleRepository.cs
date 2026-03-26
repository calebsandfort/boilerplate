using Dapper;
using Npgsql;

namespace api.Repositories;

public class TimescaleRepository
{
    private readonly string _connectionString;

    public TimescaleRepository(IConfiguration configuration)
    {
        // Use DATABASE_URL env var if set, otherwise fall back to appsettings.json
        _connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
            ?? configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        // Convert PostgreSQL URL format to Npgsql connection string if needed
        if (_connectionString.StartsWith("postgresql://"))
        {
            _connectionString = ConvertPostgresUrlToConnectionString(_connectionString);
        }
    }

    private static string ConvertPostgresUrlToConnectionString(string url)
    {
        // url format: postgresql://user:password@host:port/dbname
        var uri = new Uri(url);
        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port > 0 ? uri.Port : 5432,
            Username = uri.UserInfo.Split(':')[0],
            Password = uri.UserInfo.Split(':')[1],
            Database = uri.AbsolutePath.TrimStart('/')
        };
        return builder.ToString();
    }

    public async Task<NpgsqlConnection> CreateConnectionAsync()
    {
        var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        return connection;
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? param = null)
    {
        await using var connection = await CreateConnectionAsync();
        return await connection.QueryAsync<T>(sql, param);
    }

    public async Task<T?> QuerySingleOrDefaultAsync<T>(string sql, object? param = null)
    {
        await using var connection = await CreateConnectionAsync();
        return await connection.QuerySingleOrDefaultAsync<T>(sql, param);
    }

    public async Task<int> ExecuteAsync(string sql, object? param = null)
    {
        await using var connection = await CreateConnectionAsync();
        return await connection.ExecuteAsync(sql, param);
    }
}
