# Hub-and-Spoke WireGuard Overlay

Simplified network overlay diagram showing the edge hub as the central anchor with bidirectional WireGuard tunnels to each home node. NAT boundaries are shown at residential locations.

```mermaid
graph TB
    subgraph Internet["Public Internet"]
        EdgeHub["Edge Hub<br/>10.10.0.1<br/>Static Public IP<br/>🔑 WireGuard Endpoint"]
    end
    
    subgraph NAT1["Home 1 - Behind NAT"]
        Node1["Home Node 1<br/>10.10.0.10<br/>Dynamic ISP IP"]
    end
    
    subgraph NAT2["Home 2 - Behind NAT"]
        Node2["Home Node 2<br/>10.10.0.20<br/>Dynamic ISP IP"]
    end
    
    Node1 -.->|"Outbound WireGuard<br/>PersistentKeepalive"| EdgeHub
    EdgeHub -.->|"Return Traffic<br/>over Tunnel"| Node1
    
    Node2 -.->|"Outbound WireGuard<br/>PersistentKeepalive"| EdgeHub
    EdgeHub -.->|"Return Traffic<br/>over Tunnel"| Node2
    
    Node1 -.->|"No direct<br/>peer connection"| Node2
    
    subgraph OverlaySubnet["Overlay: 10.10.0.0/24"]
        Note["All nodes addressable<br/>via private IPs<br/>No inbound ports at homes"]
    end
    
    classDef edge fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    classDef home fill:#f0fff0,stroke:#009900,stroke-width:2px
    classDef nat fill:#ffeeee,stroke:#cc0000,stroke-width:2px,stroke-dasharray: 5 5
    
    class EdgeHub edge
    class Node1,Node2 home
    class NAT1,NAT2 nat
```
