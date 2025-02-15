# Contributing

## Contributing with Write access
When adding features or changing code, you should always create an issue with relevant tags. The workflow should then be as follows:

### When developing a new feature

- Create an issue using the [feature development template](../.github/ISSUE_TEMPLATE/feature-development-template.md), which will be shown as an option.

- Write a descriptive User Story for your new feature.

- Define Acceptance Criteria, which need to be fulfilled for the feature to be merged and the issue closed.
This will be used by reviewers to check for completeness of the feature.

- Define a Task list with checkboxes, tracking steps along the implementation. This should break the user story down into concrete sub-features. These should be small enough to make sense as a reference in a commit message.

- Create a separate branch to develop the feature.

- Create a draft pull request that will resolve the issue and link it to the issue.
  
- When committing, it is encouraged to use the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/). When starting/completing the code for a sub-feature, the sub feature/task should be referenced in the commit message as part of the description.

- Once all sub-features are implemented, mark the pull request as ready for review.