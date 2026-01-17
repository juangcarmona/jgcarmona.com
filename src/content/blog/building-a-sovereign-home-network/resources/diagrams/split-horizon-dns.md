# Split-Horizon DNS Resolution

Demonstrates how the same hostname resolves differently depending on client location: external clients reach the edge via public DNS, while internal clients resolve to overlay IPs via private DNS.

```mermaid
graph LR
    subgraph External["External Client"]
        ExtClient["Laptop<br/>(Outside)"]
    end
    
    subgraph Internal["Internal Client"]
        IntClient["Device<br/>(On Overlay)"]
    end
    
    subgraph PublicDNS["Public DNS (Cloudflare)"]
        PubResolver["DNS Resolver"]
    end
    
    subgraph PrivateDNS["Private DNS (Unbound)"]
        PrivResolver["Local DNS<br/>at Home"]
    end
    
    subgraph Edge["Edge Hub"]
        EdgeIP["203.0.113.10<br/>(Public IP)"]
    end
    
    subgraph Overlay["Private Overlay"]
        HomeIP["10.10.0.10<br/>(Home Node)"]
    end
    
    ExtClient -->|"Query:<br/>homeassistant.example.com"| PubResolver
    PubResolver -->|"Response:<br/>203.0.113.10"| ExtClient
    ExtClient -->|"HTTPS"| EdgeIP
    EdgeIP -.->|"Proxy over<br/>WireGuard"| HomeIP
    
    IntClient -->|"Query:<br/>homeassistant.example.com"| PrivResolver
    PrivResolver -->|"Response:<br/>10.10.0.10"| IntClient
    IntClient -->|"Direct HTTP"| HomeIP
    
    classDef external fill:#ffe1e1,stroke:#cc0000
    classDef internal fill:#e1ffe1,stroke:#00cc00
    classDef public fill:#e1e1ff,stroke:#0000cc
    classDef private fill:#fff5e1,stroke:#ff9900
    
    class ExtClient,PubResolver,EdgeIP external
    class IntClient,PrivResolver,HomeIP internal
```
