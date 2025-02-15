---
name: Feature development template
about: This template is to be used when starting development on a new feature.
title: "[US-001] Create Character"
labels: enhancement
assignees: ''

---

**User Story:**  
As a player, I want to create a character with a name, class, and stats so that I can use it in the game.

**Acceptance Criteria:** (to be reviewed before merging and closing the issue)  
* The player can input a name.
* The player can choose a class from a predefined list.
* The character’s stats are generated based on the chosen class.
* The character is saved in the game database.

**Tasks:** (to be actively updated by the developer)  
- [ ] Define character model in the database
- [ ] Implement UI for character creation
- [ ] Add input validation (e.g., name length, unique names)
- [ ] Save character data
- [ ] Write unit tests
