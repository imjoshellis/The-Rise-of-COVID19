# Introduction

Thanks for considering contributing to Covid Curves. I'm going to keep this short and sweet unless this project gains a lot of attention.

Following guidelines on projects of any size helps to keep things organized and updating smoothly.

We're currently open to contributions via bug reports, feature requests, documentation improvements, and writing code.

## Ground Rules

Responsibilities

* Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
* Keep pull requests as small as possible, preferably one feature/fix per request when possible.

## Getting started

### For anything bigger than a one or two line fix

1. Create your own fork of `develop`
2. Make changes on your fork in a new semantically named branch (feature/your-feature or fix/your-fix -- see previous pull requests for examples)
3. If the change is working in your local build and you think the project could use it, create a relevant issue (if there isn't one already) and submit a pull request.
4. Your pull request description must reference an issue with "Resolves ###" and must describe how the pull request solves the issue.

Note: Your issue doesn't need to have a description if you're going to make a pull request associated with it right away, but descriptions are still encouraged.

#### Small fixes

Small contributions such as fixing spelling errors are encouraged! They still must be made following the steps outlined above.

### A note on creating issues

All contributions are welcome! If you don't want to go through the process of forking and making a pull request, feel free to make an issue (details on making issues below) with specifics on what code should be changed, and someone else can take care of the rest.

## How to report a bug

If you find a security vulnerability, do NOT open an issue. Email josh@imjoshellis.com instead.

In order to determine whether you are dealing with a security issue, ask yourself these two questions:

> * Can I access something that's not mine, or something I shouldn't have access to?
> * Can I disable something for other people?

If the answer to either of those two questions are "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, just email us at josh@imjoshellis.com.

### Creating a bug report

When filing an issue, make sure to answer these five questions:

1. What browser and operating system are you using (include as much relevant info as possible)?
2. What did you do?
3. What did you expect to see?
4. What did you see instead?

## How to suggest a feature or enhancement

If you have suggestions on what to do next, first check to make sure there isn't an open or **closed** (important because your idea may have been proposed already!) issue already addressing the feature.

If you find an issue (open or closed) related to your idea, add a comment. Even if it's just "I came here to suggest this", that lets us know about community desire for the feature and helps us prioritize development.

If you can't find any relevant issues, feel free to make a new issue proposing your idea! We're open-minded and excited that you're engaged with the project.

## Code review process

Right now, all code is reviewed and approved by me (@imjoshellis) on a when-possible basis. If the project gains more attention, I will look into adding additional maintainers.

## Community

There is currently no place outside of Github to discuss this project. I'm active on Twitter [@imjoshellis](https://twitter.com/imjoshellis). DMs and mentions are open if you'd prefer to chat casually about the project.

## Conventions

### Code Style

When relevant, follow [StandardJS](https://standardjs.com/).

Note: If you're unsure of how to use code style or what to do to resolve linting errors, don't let that stop you! We can help you fix your styling after you've made a pull request.

Run the following in terminal to lint your code before submitting a pull request (replace "\<file your worked on\>" with the path to your file):

```bash
# If you worked on .svelte file(s)
eslint --ext .svelte ./src/<file you worked on>

# If you worked on .js file(s)
eslint --ext .js ./src/<file you worked on>
```

### Commit Messages

When committing, message subjects should follow the standards here: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).

In summary:

* Keep it short: ~50 chars or less
* Capitalize the first word
* Do not end with a period
* Use the imperative mood ([explanation](https://chris.beams.io/posts/git-commit/#imperative))

You may use the body of the commit message if you like, but a good subject is all that's required.

To track details, make sure to write good descriptions and comments on your issues and pull requests.

We're not particularly strict on this, so please do your best but don't stress if you made a few commits with sloppy messages.

### Labeling

We currently use the default Github labels. Use common sense when labeling, and limit issues to 1-3 labels at a time.

### File names

If your pull request requires adding new files, use a name and location that makes sense to you based on the rest of the repo. We'll discuss changes (if any) on the pull request.
