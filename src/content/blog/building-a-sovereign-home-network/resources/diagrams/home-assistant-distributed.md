# Home Assistant Distributed Model

Shows two independent Home Assistant instances, each connected to its local Zigbee network and devices. The overlay network connects both homes, but state is NOT synchronized.

```mermaid
graph TB
    subgraph Overlay["WireGuard Overlay Network"]
        OverlayLink["Overlay Connectivity<br/>❌ No state sync"]
    end
    
    subgraph House1["Home 1 - Independent Instance"]
        Node1["Home Node 1<br/>10.10.0.10"]
        HA1["Home Assistant<br/>Instance 1"]
        DB1["Local Database"]
        Zigbee1["Zigbee Network 1"]
        Devices1["Lights, Sensors,<br/>Switches"]
        Automations1["Local Automations"]
    end
    
    subgraph House2["Home 2 - Independent Instance"]
        Node2["Home Node 2<br/>10.10.0.20"]
        HA2["Home Assistant<br/>Instance 2"]
        DB2["Local Database"]
        Zigbee2["Zigbee Network 2"]
        Devices2["Lights, Sensors,<br/>Switches"]
        Automations2["Local Automations"]
    end
    
    Node1 --> HA1
    HA1 --> DB1
    HA1 --> Zigbee1
    HA1 --> Automations1
    Zigbee1 --> Devices1
    
    Node2 --> HA2
    HA2 --> DB2
    HA2 --> Zigbee2
    HA2 --> Automations2
    Zigbee2 --> Devices2
    
    Node1 <-.-> OverlayLink
    Node2 <-.-> OverlayLink
    
    HA1 -.->|"❌ No sync:<br/>State, History,<br/>Automations"| HA2
    
    classDef home1 fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef home2 fill:#f0fff0,stroke:#009900,stroke-width:2px
    classDef overlay fill:#fff5e1,stroke:#ff9900,stroke-width:2px
    
    class Node1,HA1,DB1,Zigbee1,Devices1,Automations1 home1
    class Node2,HA2,DB2,Zigbee2,Devices2,Automations2 home2
    class OverlayLink overlay
```
