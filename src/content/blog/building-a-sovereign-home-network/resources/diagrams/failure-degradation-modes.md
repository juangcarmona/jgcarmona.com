# Failure and Degradation Modes

Maps different failure scenarios and their impacts, showing how the system degrades gracefully by losing convenience rather than capability. Local operation is preserved during failures.

```mermaid
graph TB
    subgraph Normal["Normal Operation"]
        AllUp["✓ Edge Hub Online<br/>✓ Internet Available<br/>✓ All Homes Connected<br/>✓ All Services Running"]
    end
    
    subgraph EdgeFailure["Scenario 1: Edge Hub Down"]
        EdgeDown["❌ Edge Hub Offline"]
        Impact1["Impact:<br/>❌ Remote access lost<br/>❌ Public DNS down<br/>✓ Local automation works<br/>✓ Devices respond<br/>✓ Dashboards functional"]
    end
    
    subgraph InternetFailure["Scenario 2: Home Internet Down"]
        NetDown["❌ ISP Connection Lost"]
        Impact2["Impact:<br/>❌ Remote access lost<br/>❌ Overlay disconnected<br/>✓ All local services work<br/>✓ Zigbee automation works<br/>✓ Cameras record locally"]
    end
    
    subgraph IsolatedHome["Scenario 3: Home Isolated"]
        HomeIso["❌ One Home Unreachable"]
        Impact3["Impact:<br/>❌ That home not accessible<br/>✓ Other home unaffected<br/>✓ Edge still routes traffic<br/>✓ No cascading failure"]
    end
    
    subgraph ServiceFailure["Scenario 4: Service Crash"]
        ServiceDown["❌ Docker Service Failed"]
        Impact4["Impact:<br/>Isolated to one node<br/>Other services unaffected<br/>systemd handles restart<br/>Logs show failure mode<br/>Recovery is local"]
    end
    
    AllUp -.->|"Failure event"| EdgeDown
    AllUp -.->|"Failure event"| NetDown
    AllUp -.->|"Failure event"| HomeIso
    AllUp -.->|"Failure event"| ServiceDown
    
    EdgeDown --> Impact1
    NetDown --> Impact2
    HomeIso --> Impact3
    ServiceDown --> Impact4
    
    Impact1 -.->|"Manual recovery:<br/>Restart edge VPS"| AllUp
    Impact2 -.->|"Auto recovery:<br/>ISP restores"| AllUp
    Impact3 -.->|"Diagnose locally:<br/>Check WireGuard"| AllUp
    Impact4 -.->|"Auto recovery:<br/>systemd restart"| AllUp
    
    classDef normal fill:#f0fff0,stroke:#009900,stroke-width:3px
    classDef failure fill:#ffeeee,stroke:#cc0000,stroke-width:2px
    classDef impact fill:#fff5e1,stroke:#ff9900,stroke-width:2px
    
    class AllUp normal
    class EdgeDown,NetDown,HomeIso,ServiceDown failure
    class Impact1,Impact2,Impact3,Impact4 impact
```
