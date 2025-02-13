# Contributing

## Contributing with Write access
When adding features or changing code, you should always create an issue with relevant tags. The workflow should then be as follows:

- Check for [User Stories](user_stories.md) related to your feature/feature idea. If none exist, create a new User Story.

- Create an issue and link to the user story it will implement. (also see the [issue template](../ISSUE_TEMPLATE/development.md))

- Create a ToDo list with checkboxes, tracking steps along the implementation. This should break the user story down into concrete sub-features. These should be small enough to make sense as a reference in a commit message.

- Create a separate branch to develop the feature.

- Create a draft pull request that will resolve the issue and link it to the issue.

- If you created a new User Story, add it to the [list of User Stories](user_stories.md) and edit your issue description to include the link.
  
- When committing, it is encouraged to use the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/). Sub-features should be referenced in commit messages as part of the description, mainly when starting/completing the code for a sub-feature.

- Once all sub-features are implemented, mark the pull request as ready for review.
