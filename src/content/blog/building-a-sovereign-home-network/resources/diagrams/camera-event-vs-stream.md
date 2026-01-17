# Camera Event vs Stream Flow

Illustrates two distinct data paths for camera systems: event path (motion detection to automation) is lightweight and persistent, while stream path (video feed) is heavy and transient.

```mermaid
graph TB
    subgraph Camera["IP Camera"]
        CamHW["Camera Hardware"]
    end
    
    subgraph EventPath["Event Path (Lightweight & Persistent)"]
        Motion["Motion Detection<br/>(On-camera or software)"]
        Event["Event Record<br/>(timestamp, type)"]
        Snapshot["Snapshot Image<br/>(JPEG, 100KB)"]
        Trigger["Automation Trigger"]
        Database["Event Database<br/>(retained 30 days)"]
    end
    
    subgraph StreamPath["Stream Path (Heavy & Transient)"]
        Stream["Video Stream<br/>(H.264/H.265)"]
        Buffer["Temporary Buffer<br/>(memory)"]
        Recording["Clip Recording<br/>(7-day retention)"]
        LiveView["Live View<br/>(on demand)"]
        Discard["❌ Discarded<br/>(no continuous recording)"]
    end
    
    subgraph HomeAssistant["Home Assistant"]
        HAAutomation["Automation Engine"]
        Notify["Notifications"]
    end
    
    CamHW --> Motion
    CamHW --> Stream
    
    Motion --> Event
    Motion --> Snapshot
    Event --> Database
    Snapshot --> Database
    
    Event --> Trigger
    Trigger --> HAAutomation
    HAAutomation --> Notify
    
    Stream --> Buffer
    Stream --> LiveView
    
    Buffer --> Recording
    Buffer --> Discard
    
    Recording -.->|"Deleted after<br/>7 days"| Discard
    
    classDef event fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef stream fill:#fff5e1,stroke:#ff9900,stroke-width:2px
    classDef persistent fill:#f0fff0,stroke:#009900,stroke-width:2px
    classDef transient fill:#ffeeee,stroke:#cc0000,stroke-width:2px,stroke-dasharray: 5 5
    
    class Motion,Event,Snapshot,Trigger,Database event
    class Stream,Buffer,LiveView stream
    class Database,Recording persistent
    class Discard transient
```
