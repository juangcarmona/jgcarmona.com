# Backup Flow

Shows the backup workflow: configuration and selective state are extracted from local nodes, versioned, and stored off-node. Distinguishes between scheduled automatic backups and manual backups.

```mermaid
graph LR
    subgraph Sources["Source: Local Nodes"]
        Config["Configuration Files<br/>/etc/wireguard/<br/>/srv/services/<br/>/etc/systemd/"]
        SelectState["Selective State<br/>HA config<br/>automation.yaml<br/>secrets.yaml"]
        Excluded["❌ Excluded<br/>Media files<br/>Logs<br/>Cache<br/>Temp data"]
    end
    
    subgraph Extraction["Extraction Process"]
        Script["Backup Script<br/>(rsync/tar)"]
        Schedule["Cron Job<br/>(Daily 2:00 AM)"]
        Manual["Manual Trigger<br/>(before changes)"]
    end
    
    subgraph Storage["Storage Destinations"]
        Git["Git Repository<br/>(versioned config)"]
        OffSite["Off-Site Backup<br/>(encrypted)"]
        Retention["Retention Policy<br/>Daily: 7 days<br/>Weekly: 4 weeks<br/>Monthly: 6 months"]
    end
    
    subgraph Recovery["Recovery Path"]
        Restore["Restore Process<br/>(rebuild node)"]
        Validate["Validation<br/>(test boot)"]
    end
    
    Config --> Script
    SelectState --> Script
    
    Schedule -->|"Automatic"| Script
    Manual -->|"On-demand"| Script
    
    Script --> Git
    Script --> OffSite
    
    Git --> Retention
    OffSite --> Retention
    
    Retention --> Restore
    Restore --> Validate
    
    classDef source fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef process fill:#fff5e1,stroke:#ff9900,stroke-width:2px
    classDef storage fill:#f0fff0,stroke:#009900,stroke-width:2px
    classDef excluded fill:#ffeeee,stroke:#cc0000,stroke-width:2px,stroke-dasharray: 5 5
    
    class Config,SelectState source
    class Script,Schedule,Manual process
    class Git,OffSite,Retention,Restore,Validate storage
    class Excluded excluded
```
