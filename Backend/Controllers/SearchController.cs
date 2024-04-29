using Microsoft.AspNetCore.Mvc;

namespace DotNet.Docker.Controllers;

public class SearchResult
{
    public int EntityType { get; set; }

    public string? EntityId { get; set; }
}

[ApiController]
[Route("[controller]")]
public class SearchController : ControllerBase
{
    private readonly ILogger<SearchController> _logger;

    public SearchController(ILogger<SearchController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "PostQuery")]
    public IEnumerable<SearchResult> Get(string prompt)
    {
        return Enumerable.Range(1, 2).Select(index => new SearchResult
        {
            EntityType = index,
            EntityId = prompt,
        })
        .ToArray();
    }
}
