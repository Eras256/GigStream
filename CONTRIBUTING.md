# Contributing Guide to GigStream

Thank you for your interest in contributing to GigStream! This document provides guidelines for contributing to the project effectively and in alignment with GitHub policies.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [GitHub Policies](#github-policies)
- [Questions](#questions)

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [INSERT EMAIL OR CONTACT METHOD].

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please:

1. **Check that the bug hasn't already been reported** by searching in [Issues](https://github.com/vaiosx01/Gigstream/issues)
2. If it doesn't exist, create a new issue with:
   - A clear and descriptive title
   - A detailed description of the problem
   - Steps to reproduce the bug
   - Expected behavior vs actual behavior
   - Environment information (Node.js version, operating system, etc.)
   - Screenshots if applicable

### Suggesting Enhancements

Suggestions for new features are welcome:

1. **Check that the suggestion hasn't been proposed** by searching in [Issues](https://github.com/vaiosx01/Gigstream/issues)
2. Create a new issue with:
   - A clear and descriptive title
   - Detailed description of the proposed functionality
   - Explanation of why it would be useful
   - Usage examples if applicable

### Contributing Code

1. **Fork the repository**
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-description
   ```
3. **Make your changes** following the [Code Standards](#code-standards)
4. **Ensure tests pass**:
   ```bash
   pnpm test
   pnpm run test:e2e
   ```
5. **Commit your changes** with descriptive messages:
   ```bash
   git commit -m "feat: add new feature X"
   # or
   git commit -m "fix: fix bug in component Y"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** in the main repository

## Development Process

### Environment Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Gigstream.git
   cd Gigstream
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your credentials
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

### Project Structure

```
Gigstream/
├── src/                    # Main source code
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities and libraries
│   └── providers/         # Context providers
├── contracts/             # Smart contracts (Solidity)
├── tests/                 # E2E tests
└── public/                # Static files
```

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` - use specific types
- Document complex functions with JSDoc

### Code Style

- Follow the existing project style
- Use Prettier for formatting (configured in the project)
- Run the linter before committing:
  ```bash
  pnpm run lint
  ```

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes (doesn't affect code)
- `refactor:` Code refactoring
- `test:` Add or modify tests
- `chore:` Tool or configuration changes

Example:
```
feat: add real-time notification system
fix: fix wallet connection error
docs: update README with new instructions
```

### Tests

- Write tests for new features
- Ensure all tests pass before making a PR
- Maintain or improve existing test coverage

### Smart Contracts

- Follow Solidity security best practices
- Document all public functions
- Add tests for new contracts
- Verify contracts after deployment

## GitHub Policies

This project strictly complies with official GitHub policies. Please make sure to review and follow:

### GitHub Community Guidelines

- [Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines)
- Maintain a respectful and inclusive environment
- We do not tolerate harassment, abuse, or discrimination

### Acceptable Use Policies

- [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies)
- **DO NOT** upload illegal content, spam, or malicious code
- **DO NOT** use the repository for cryptocurrency mining
- **DO NOT** publish personal information without consent
- **DO NOT** violate copyright or intellectual property rights

### Security

- [Security Policy](SECURITY.md)
- Report vulnerabilities responsibly
- Do not publish vulnerabilities publicly before they are resolved

### Prohibited Content

In accordance with GitHub policies, the following is strictly prohibited:

- Content that promotes illegal activities
- Sexually explicit material
- False or misleading information
- Spam or platform abuse activities
- Content that violates copyright
- Sensitive data (API keys, passwords, private tokens)

### Verification Before Pushing Changes

Before committing or pushing, verify:

- ✅ No API keys, passwords, or private tokens in the code
- ✅ No personal user information
- ✅ Code complies with acceptable use policies
- ✅ Commits have descriptive messages
- ✅ Tests pass
- ✅ Code is properly formatted

## Pull Requests

### Review Process

1. PRs will be reviewed by maintainers
2. There may be requests for changes
3. Once approved, the PR will be merged

### PR Checklist

- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Tests added for new features
- [ ] Documentation updated if necessary
- [ ] No sensitive information in code
- [ ] Commits follow Conventional Commits format
- [ ] PR has a clear description of changes

## Questions

If you have questions about how to contribute:

1. Review existing documentation
2. Search existing issues
3. Open a new issue with the `question` label
4. Contact project maintainers

## Acknowledgments

Thank you for contributing to GigStream! Your help makes this project better for everyone.
