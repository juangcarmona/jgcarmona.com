# Remote Access Patterns

Illustrates administrative and user access patterns: admins can reach nodes via public edge or overlay, while user access is always mediated through the edge reverse proxy.

```mermaid
graph TB
    subgraph Admin["Administrator"]
        AdminLaptop["Admin Laptop<br/>(WireGuard Client)"]
    end
    
    subgraph Users["End Users"]
        UserDevice["User Device<br/>(No VPN)"]
    end
    
    subgraph Edge["Edge Hub"]
        SSHEdge["SSH Service<br/>Port 22"]
        HTTPSProxy["HTTPS Proxy<br/>Port 443"]
    end
    
    subgraph Overlay["WireGuard Overlay<br/>10.10.0.0/24"]
        OverlayNet["Private Network"]
    end
    
    subgraph Home1["Home Node 1"]
        SSH1["SSH Service"]
        Services1["Exposed Services<br/>(HA, Cameras)"]
        Internal1["❌ Internal Services<br/>(Zigbee2MQTT, DBs)"]
    end
    
    subgraph Home2["Home Node 2"]
        SSH2["SSH Service"]
        Services2["Exposed Services<br/>(HA, Cameras)"]
        Internal2["❌ Internal Services<br/>(Zigbee2MQTT, DBs)"]
    end
    
    AdminLaptop -->|"Path 1: SSH<br/>via Public IP"| SSHEdge
    AdminLaptop -->|"Path 2: Direct SSH<br/>via 10.10.0.x"| OverlayNet
    
    OverlayNet --> SSH1
    OverlayNet --> SSH2
    
    UserDevice -->|"HTTPS Only<br/>(TLS enforced)"| HTTPSProxy
    HTTPSProxy -.->|"Proxied<br/>over overlay"| Services1
    HTTPSProxy -.->|"Proxied<br/>over overlay"| Services2
    
    UserDevice -.->|"❌ Never<br/>accessible"| Internal1
    UserDevice -.->|"❌ Never<br/>accessible"| Internal2
    
    Services1 --- Internal1
    Services2 --- Internal2
    
    classDef admin fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef user fill:#ffe1f5,stroke:#cc00cc,stroke-width:2px
    classDef edge fill:#fff5e1,stroke:#ff9900,stroke-width:2px
    classDef overlay fill:#f0fff0,stroke:#009900,stroke-width:2px
    classDef blocked fill:#ffeeee,stroke:#cc0000,stroke-width:2px,stroke-dasharray: 5 5
    
    class AdminLaptop admin
    class UserDevice user
    class SSHEdge,HTTPSProxy edge
    class OverlayNet,SSH1,SSH2,Services1,Services2 overlay
    class Internal1,Internal2 blocked
```
