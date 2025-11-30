---
title: "RADICLE.XYZ - CHEAT SHEE"
description: ''
pubDate: 2025-01-15
categories: 
  - "blog"
  - "desarrollo-software"
heroImage: "images/default-seed-header1.png"
---

Here's a concise cheat sheet for Radicle, a peer-to-peer code collaboration protocol built on Git. I also wrote a [Quick Start guide](https://jgcarmona.com/radicle-decentralized-git-collaboration/).

## SETUP & INIT

### Install Radicle CLI

From binaries:

```
curl -sSf https://radicle.xyz/install | sh
```

From source:

```
cargo install --git https://seed.radicle.xyz/z3gqcJUoA1n9HaHKufZs5FCSGazv5.git radicle-cli radicle-node radicle-remote-helper
```

Requirements:

- Linux or Unix-based OS

- Git 2.34 or later

- OpenSSH 9.1 or later with ssh-agent

### IDENTITY MANAGEMENT

**Create Identity**

```
rad auth
```

Generates a new Radicle identity tied to your device.

### REPOSITORY MANAGEMENT

**Initialize Repository**

```
rad init --name [repo-name]
```

Initializes a new Radicle repository.

**Clone Repository**

```
rad clone [RID]
```

Clones a repository using its Radicle Identifier (RID).

**Publish Changes**

```
rad push
```

Publishes your changes to the Radicle network.

### BRANCH & MERGE

**Create Branch**

```
git checkout -b [branch-name]
```

Creates a new branch in your repository.

**Merge Branch**

```
git checkout main
git merge [branch-name]
```

Merges the specified branch into main.

### COLLABORATION

**Create Issue**

```
rad issue create --title "[issue-title]" --description "[issue-description]"
```

Creates a new issue in the repository.

**List Issues**

```
rad issue list
```

Lists all issues in the repository.

**Submit Patch**

```
rad patch submit --message "[patch-message]"
```

Submits a patch for review.

**Review Patch**

```
rad patch review [patch-id]
```

Reviews a submitted patch.

### SEEDING & NETWORKING

**Seed Repository**

```
rad seed add [RID]
```

Starts seeding a repository to the network.

**Unseed Repository**

```
rad seed remove [RID]
```

  
Stops seeding a repository.

**List Seeded Repositories**

```
rad seed list
```

  
Lists all repositories you're seeding.

### NODE OPERATIONS

**Start Node**

```
radicle-node start
```

Starts the Radicle node daemon.

**Stop Node**

```
radicle-node stop
```

Stops the Radicle node daemon.

**Check Node Status**

```
rad node status
```

  
Displays the current status of your Radicle node.

* * *

This cheat sheet provides a quick reference to essential Radicle commands for setting up your environment, managing repositories, collaborating with others, and maintaining your node.

For more detailed information, refer to the [**Radicle User Guide**](https://radicle.xyz/guides/user) and the [**Radicle Protocol Guide**](https://radicle.xyz/guides/protocol).
