# Security Policy

## Supported Version

Currently, only the latest version of the project receives security updates.

## Reporting a Vulnerability

We appreciate security vulnerability reports. GitHub recognizes and rewards security researchers who help keep our users and services safe.

### How to Report

**Please DO NOT report security vulnerabilities publicly through GitHub Issues.**

Instead, please:

1. **Send an email to**: [INSERT SECURITY EMAIL]
   - Or create a private [Security Advisory](https://github.com/vaiosx01/Gigstream/security/advisories/new)

2. **Include the following information**:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact of the vulnerability
   - Suggestions for a solution (if you have any)

3. **Wait for a response**: We will respond within 48 hours

### Coordinated Disclosure Process

We follow GitHub's [Coordinated Vulnerability Disclosure](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities) process:

1. **Initial report**: We receive and acknowledge the report
2. **Investigation**: We investigate and validate the vulnerability
3. **Fix**: We develop and test a fix
4. **Disclosure**: We publish the fix and give credit to the researcher (if desired)

### What to Expect

- **Initial response**: Within 48 hours
- **Confirmation**: Within 7 days
- **Status updates**: Weekly until resolution
- **Credit**: We will give you credit in the CHANGELOG and Security Advisory (if desired)

## GitHub Security Policies

This project complies with [GitHub Security Policies](https://docs.github.com/en/site-policy/security-policies).

### Security Best Practices

#### For Developers

- **Never commit sensitive information**:
  - Private API keys
  - Passwords
  - Access tokens
  - Wallet private keys
  - Environment variables with sensitive data

- **Use environment variables**:
  - All credentials should be in `.env.local` (not committed)
  - Use `env.example` as a template
  - Never upload `.env.local` to the repository

- **Review code before committing**:
  ```bash
  # Check for sensitive information
  git diff
  git status
  ```

- **Use `.gitignore` correctly**:
  - Ensure `.env.local`, `node_modules`, and other sensitive files are ignored

#### For Users

- **Keep your dependencies updated**:
  ```bash
  pnpm update
  ```

- **Review changes before pulling**:
  - Verify there are no suspicious changes
  - Review commits before merging

- **Use secure wallets**:
  - Never share your private key
  - Use hardware wallets when possible
  - Verify transactions before confirming them

### Critical Security Areas

#### Smart Contracts

- All contracts must pass security audits
- Use proven libraries (OpenZeppelin when possible)
- Implement proper access controls
- Test thoroughly before deploying

#### API Keys and Credentials

- **Never** commit API keys in code
- Use environment variables for all credentials
- Rotate credentials regularly
- Use different credentials for development and production

#### Authentication and Authorization

- Validate all user inputs
- Implement rate limiting on public APIs
- Use HTTPS for all communications
- Implement CORS correctly

### Known Vulnerabilities

There are currently no known vulnerabilities. If you discover one, please report it following the process above.

### Security History

Resolved vulnerabilities are documented in:
- [GitHub Security Advisories](https://github.com/vaiosx01/Gigstream/security/advisories)
- [CHANGELOG.md](CHANGELOG.md)

### Additional Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Somnia Network Security](https://docs.somnia.network/security)

## Rewards

We currently do not offer a bug bounty program, but we greatly appreciate responsible reports and give public credit to researchers (if desired).

## Contact

For security questions that are not vulnerabilities, you can:
- Open a public issue with the `security-question` label
- Contact project maintainers

---

**Last updated**: December 2025
**Complies with**: GitHub Security Policies (December 2025)
